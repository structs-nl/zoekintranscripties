import { Description, Params } from './model';
import { Client } from '@elastic/elasticsearch';
import config from '../../config';
import { RawTreeBucket } from '../search/model';

export class DescriptionsService {
  /**
   * Return a list of descriptions from Elasticsearch based on the query input
   */
  public async search(client: Client, params: Params): Promise<Description[]> {
    try {
      const response = await client.search({
        index: config.inventoryIndex,
        body: {
          size: 0,
          aggs: {
            archives: {
              nested: {
                path: 'nest',
              },
              aggs: {
                archives: {
                  filter: {
                    regexp: {
                      'nest.description_title': {
                        value: `.*${params.query}.*`,
                        case_insensitive: true,
                      },
                    },
                  },
                  aggs: {
                    archives: {
                      terms: {
                        size: 20,
                        field: 'nest.description_path',
                      },
                      aggs: {
                        title: {
                          terms: {
                            field: 'nest.description_title',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      return response.body.aggregations.archives.archives.archives.buckets.map(
        (bucket: RawTreeBucket) => ({
          label: bucket.title.buckets[0].key,
          value: bucket.key,
          count: bucket.doc_count,
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
