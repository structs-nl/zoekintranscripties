import {
  Body,
  Controller,
  Get,
  Hidden,
  Post,
  Query,
  Response,
  Route,
} from 'tsoa';
import {
  client,
  InternalServerErrorJSON,
  ValidateErrorJSON,
  NotFoundJSON,
} from '../../helpers';
import { InventoryBodyParams, InventoryResponseLD } from './model';
import { InventoryService } from './service';

@Route('inventory')
export class DocumentController extends Controller {
  service: InventoryService;

  constructor() {
    super();
    this.service = new InventoryService();
  }

  /**
   * Fetch a specific inventory
   * @example id "https://archief.nl/doc/transcriptie/nl-hana/1.04.02/7660"
   * @example limit "10"
   * @example offset "0"
   * @example query "Batavia"
   * @param id The complete id of the inventory you are looking for
   * @param limit The amount of pages you want the inventory to include
   * @param offset The position to start including the pages from
   */
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<NotFoundJSON>(404, 'Not Found')
  @Response<InternalServerErrorJSON>(500, 'Internal Server Error')
  @Post()
  public async get(
    @Query() id: string,
    @Query() limit?: string,
    @Query() offset?: string,
    @Body() requestBody?: InventoryBodyParams
  ): Promise<InventoryResponseLD> {
    return this.service.get(client, {
      id,
      limit: Number(limit) || 10,
      offset: Number(offset) || 0,
      query: requestBody?.query || undefined,
    });
  }

  /**
   * Return a list of links to all inventories
   */
  @Hidden()
  @Get('list')
  public async list(@Query() page?: string): Promise<string[]> {
    return this.service.list(client, {
      page: Number(page) || 0,
      size: 10000, // Maximum number elastic can handle
    });
  }
}
