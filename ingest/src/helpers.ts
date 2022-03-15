import { Request, Response, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import winston, { format } from 'winston';

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

export interface BadRequestErrorJSON {
  message: 'Bad Request';
}

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
  if (request.file) {
    logger.info(`(${request.file.originalname}) ${error.message}`);
  } else {
    logger.info(`(unknown file) ${error.message}`);
  }

  if (error instanceof ValidateError) {
    return response.status(422).json({
      message: 'Validation Failed',
      details: error?.fields,
    });
  }

  return response.status(error.statusCode || 500).json({
    message: error.message || 'Something went wrong',
    description: error.description,
  });
};

type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export const catchErrors = (fn: Middleware) => async (
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

abstract class CustomError extends Error {
  statusCode: number;
  message: string;
  description: unknown;

  constructor(message: string, statusCode: number, description?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ResourceNotFoundError extends CustomError {
  constructor(message?: string) {
    super(message || 'Resource not found', 404);
  }
}

export class ServerTooBusyError extends CustomError {
  constructor(message?: string) {
    super(message || 'Server too busy', 503);
  }
}

export class BadRequestError extends CustomError {
  constructor(message?: string, description?: unknown) {
    super(message || 'Bad Request', 400, description);
  }
}

export class InternalServerError extends CustomError {
  constructor(message?: string, description?: unknown) {
    super(message || 'Internal Server Error', 500, description);
  }
}
