import { Hidden, Controller, Get, Query, Route } from 'tsoa';
import { Description } from './model';
import { DescriptionsService } from './service';
import { client } from '../../helpers';

@Hidden()
@Route('descriptions')
export class DescriptionsController extends Controller {
  descriptions: DescriptionsService;

  constructor() {
    super();
    this.descriptions = new DescriptionsService();
  }

  /**
   * Retrieves a list of top-level archives
   * @example query "VOC"
   * @param query The search query used to filter archives
   */
  @Get()
  public async searchDescription(
    @Query() query: string
  ): Promise<Description[]> {
    return this.descriptions.search(client, {
      query,
    });
  }
}
