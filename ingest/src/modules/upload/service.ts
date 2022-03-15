import { transformToElasticBulk, splitIntoChunks } from './transform';
import zlib from 'zlib';
import { BadRequestError, InternalServerError, logger } from '../../helpers';
import { Client } from '@elastic/elasticsearch';
import { ValidateFunction } from 'ajv';
import { DocumentResponseLD } from './model';

export class IngestService {
  /**
   * Processes a jsonld inventory and adds the inventory to elastic
   * - Check for filetype
   * - Unzip
   * - Validate json
   * - Parse and transform json
   * - Send to elastic
   */
  public async upload(
    client: Client,
    validate: ValidateFunction,
    file: Express.Multer.File
  ): Promise<{ success: true }> {
    const jsonMimeTypes = ['application/json'];
    const gzipMimeTypes = ['application/x-gzip', 'application/gzip'];

    if (![...jsonMimeTypes, ...gzipMimeTypes].includes(file.mimetype)) {
      throw new BadRequestError(
        `File has wrong mimetype, the following are accepted: ${[
          ...jsonMimeTypes,
          ...gzipMimeTypes,
        ].join(', ')}`
      );
    }

    const data = jsonMimeTypes.includes(file.mimetype)
      ? file.buffer.toString()
      : zlib.gunzipSync(file.buffer).toString();

    const json = JSON.parse(data) as DocumentResponseLD;
    const valid = validate(json);

    if (!valid || validate.errors) {
      throw new BadRequestError('Validation failed', validate.errors);
    }

    const { bulk, id } = transformToElasticBulk(json);

    if (id === undefined) {
      throw new Error('No inventory id found');
    }

    // TODO: base chunk on byte size
    const chunks = splitIntoChunks(bulk, 100);
    const bulkPromises = chunks.map((chunk) =>
      client.bulk({
        refresh: true,
        body: chunk as any[],
      })
    );

    const es = await Promise.all(bulkPromises);

    const elasticErrors = es.filter(
      (esResponse) => esResponse.body.errors === undefined
    );

    if (elasticErrors.length > 0) {
      logger.info(JSON.stringify(elasticErrors[0].body));

      throw new InternalServerError(
        'Error posting bulk to Elastic',
        // TODO: filter errors from responses
        elasticErrors
      );
    }

    logger.info(`Successfully imported: ${id}`);

    return {
      success: true,
    };
  }
}
