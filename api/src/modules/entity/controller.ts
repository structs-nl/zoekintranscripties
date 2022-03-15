import { Body, Controller, Get, Post, Query, Response, Route } from 'tsoa';
import {
  client,
  InternalServerErrorJSON,
  ValidateErrorJSON,
  NotFoundJSON,
} from '../../helpers';
import { EntityResponseLD } from './model';
import { EntityService } from './service';

@Route('entity')
export class EntityController extends Controller {
  entity: EntityService;

  constructor() {
    super();
    this.entity = new EntityService();
  }

  /**
   * Fetch a specific entity including search results
   * @example id "https://archief.nl/doc/transcriptie/nl-hana/1.04.02/7660/0021"
   * @param id The complete id of the entity you are looking for
   */
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<NotFoundJSON>(404, 'Not Found')
  @Response<InternalServerErrorJSON>(500, 'Internal Server Error')
  @Post()
  public async searchEntity(
    @Query() id: string,
    @Body() requestBody?: { query?: string }
  ): Promise<EntityResponseLD> {
    return this.entity.search(client, id, requestBody?.query);
  }

  /**
   * Fetch a specific entity
   * @example id "https://archief.nl/doc/transcriptie/nl-hana/1.04.02/7660/0021"
   * @param id The complete id of the entity you are looking for
   */
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<NotFoundJSON>(404, 'Not Found')
  @Response<InternalServerErrorJSON>(500, 'Internal Server Error')
  @Get()
  public async getEntity(@Query() id: string): Promise<EntityResponseLD> {
    return this.entity.get(client, id);
  }
}
