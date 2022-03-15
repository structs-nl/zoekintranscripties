import { SearchParams, SearchResults } from './model';
import { client, logger } from '../../helpers';
import { normalizeHit, normalizeAggs } from './normalize';
import { parseSearchQuery } from './parser';
import config from '../../config';
import {
  queryFactory,
  sortFactory,
  aggsFilterFactory,
  postFilterFactory,
  nameTypeAggs,
  escapeRegex,
  flattenExpansions,
} from './helpers';

export class SearchService {
  /**
   * The following steps are followed in order to process a search request
   * - The query is parsed and expanded with all available synonyms by default unless the user has defined specific expansions
   * - The query, filters and aggregates for the elastic query are constructed
   * - Do request to Elasticsearch
   * - Normalize the Elasticsearch response in the correct format
   */
  public async search(params: SearchParams): Promise<SearchResults> {
    try {
      const { expandedQuery, expansions, terms } = await parseSearchQuery(
        params.query,
        params.expansions
      );
      const query = queryFactory(expandedQuery);
      const sort = sortFactory(params.sort);
      const aggFilters = aggsFilterFactory(params);
      const postFilters = postFilterFactory(params);
      const descriptionPrefix = params.descriptionPrefix
        ? escapeRegex(params.descriptionPrefix)
        : '';

      const body = {
        _source: false,
        stored_fields: [
          'id',
          'archive_id',
          'archive_title',
          'access_id',
          'access_title',
          'inventory_id',
          'inventory_title',
          'date',
        ],
        from: params.offset,
        size: params.limit,
        sort,
        query,
        post_filter: {
          bool: {
            must: [...aggFilters, ...postFilters],
          },
        },
        aggs: {
          histogram: {
            auto_date_histogram: {
              field: 'date',
              format: 'yyyy',
              buckets: 12,
            },
          },
          nameTypes:
            params.query !== undefined
              ? {
                  filter: {
                    bool: {
                      must: [...aggFilters, ...postFilters].filter(Boolean),
                    },
                  },
                  aggs: {
                    buckets: {
                      nested: {
                        path: 'nest',
                      },
                      aggs: {
                        location: nameTypeAggs(
                          'nest.entity_location',
                          params.query
                        ),
                        person: nameTypeAggs(
                          'nest.entity_person',
                          params.query
                        ),
                        time: nameTypeAggs('nest.entity_time', params.query),
                      },
                    },
                  },
                }
              : undefined,
          description: {
            filter: {
              bool: {
                must: [...aggFilters].filter(Boolean),
              },
            },
            aggs: {
              archives: {
                nested: {
                  path: 'nest',
                },
                aggs: {
                  archives: {
                    terms: {
                      include: `${descriptionPrefix}\\|[^\\|]*`,
                      field: 'nest.description_path',
                      size: 1000,
                    },
                    aggs: {
                      title: {
                        terms: { field: 'nest.description_title' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      logger.info(JSON.stringify(body));

      const response = await client.search({
        index: config.inventoryIndex,
        body,
      });

      const hits = response.body.hits.hits.map(
        normalizeHit([...flattenExpansions(expansions), ...terms])
      );
      const aggregations = normalizeAggs(response.body.aggregations);
      const total = (response.body.hits.total as any).value;

      return {
        hits,
        total,
        aggregations,
        expansions: Object.keys(expansions).length > 0 ? expansions : undefined,
        query: expandedQuery,
      };
    } catch (error) {
      logger.error(error);
      throw new Error('Something went wrong with elastic');
    }
  }
}
