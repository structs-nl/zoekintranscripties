import { Body, Controller, Post, Response, Route } from 'tsoa';
import { InternalServerErrorJSON, ValidateErrorJSON } from '../../helpers';
import { SearchResults, SearchParams } from './model';
import { SearchService } from './service';

@Route('search')
export class SearchController extends Controller {
  service: SearchService;

  constructor() {
    super();
    this.service = new SearchService();
  }

  /**
   * Search in transcriptions of inventories of a number of archives
   */
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<InternalServerErrorJSON>(500, 'Internal Server Error')
  @Post()
  public async search(
    @Body() requestBody: SearchParams
  ): Promise<SearchResults> {
    return this.service.search(requestBody);
  }
}
