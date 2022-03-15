import { ValidateError } from 'tsoa';
import { Client } from '@elastic/elasticsearch';
import winston, { format } from 'winston';
import { Request, Response, NextFunction } from 'express';
import config from './config';

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  format: format.combine(format.timestamp(), myFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
export interface Entity<T> {
  entity: T;
}

export const client = new Client({
  node: config.elasticUrl,
});

export interface ValidateErrorJSON {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}

export interface InternalServerErrorJSON {
  message: 'Something went wrong';
}

type ErrorResponseBody = ValidateErrorJSON | InternalServerErrorJSON;

export const errorHandler = (
  error: CustomError,
  request: Request,
  response: Response,
  // NOTE: next param is necessary for recognizing error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response<ErrorResponseBody> | void => {
  logger.error(request.url, error.message, error);

  if (error instanceof ValidateError) {
    return response.status(422).json({
      message: 'Validation Failed',
      details: error?.fields,
    });
  }

  return response.status(error.statusCode || 500).json({
    message: 'Something went wrong',
  });
};

type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

const catchErrors = (fn: Middleware) => async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await fn(request, response, next);
  } catch (error) {
    next(error);
  }
};

export abstract class CustomError extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ResourceNotFoundError extends CustomError {
  constructor(message?: string) {
    super(message || 'Resource not found', 404);
  }
}

export class BadRequestError extends CustomError {
  constructor(message?: string) {
    super(message || 'Bad Request', 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message?: string) {
    super(message || 'Unauthorized', 401);
  }
}

export class InternalServerError extends CustomError {
  constructor(message?: string) {
    super(message || 'Internal Server Error', 500);
  }
}

export const loggingMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  logger.info('🌎 Request', request.url, JSON.stringify(request.body));

  next();
};

export interface NotFoundJSON {
  message: 'Not found';
}

export const notFoundHandler = (request: Request, response: Response): void => {
  response.status(404).send({
    message: 'Not found',
  });
};

export const createResponse = catchErrors(
  (request: Request, response: Response): void => {
    if (!response.locals) {
      response.status(204).send();
      return;
    }

    response.status(200).json({
      data: response.locals,
    });
  }
);
