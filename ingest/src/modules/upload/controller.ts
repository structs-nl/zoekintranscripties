import { Post, Route, Request, Response } from 'tsoa';
import express from 'express';
import multer from 'multer';
import AJV from 'ajv';
import { Client } from '@elastic/elasticsearch';
import {
  InternalServerErrorJSON,
  ValidateErrorJSON,
  BadRequestErrorJSON,
  BadRequestError,
} from '../../helpers';

import * as schema from '../../schema.json';
import config from '../../config';

import { IngestService } from './service';

const client = new Client({
  node: config.elasticUrl,
});

const ajv = new AJV({
  strict: true,
  strictTuples: true,
  strictTypes: true,
  ownProperties: true,
});

const validate = ajv.compile(schema);

@Route('/')
export class UploadController {
  service: IngestService;

  constructor() {
    this.service = new IngestService();
  }

  /**
   * Upload jsonld inventories, upload either a json file or a gzipped json file
   */
  @Response<BadRequestErrorJSON>(400, 'Bad Request')
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<InternalServerErrorJSON>(500, 'Internal Server Error')
  @Response(503, 'Server Too Busy')
  @Post('upload')
  public async uploadFile(
    @Request() request: express.Request
  ): Promise<{ success: true }> {
    await this.handleFile(request);

    if (!request.file) {
      throw new BadRequestError('File was not provided');
    }

    return this.service.upload(client, validate, request.file);
  }

  private handleFile(request: express.Request): Promise<void> {
    const multerSingle = multer().single('file');

    return new Promise((resolve, reject) => {
      multerSingle(request, {} as express.Response, (error: any) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  }
}
