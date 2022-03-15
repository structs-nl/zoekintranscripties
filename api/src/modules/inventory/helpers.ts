import { InventoryParams } from './model';
import { Canvas, Word } from '../entity/model';
import { termsQueryFactory } from '../search/helpers';
import { client } from '../../helpers';
import config from '../../config';
import { RawHit, RawInnerHit } from '../search/model';

/**
 * Fetch canvases by id and add a list with tokens (words) that match query
 */
export const fetchCanvasEntities = async (
  ids: string[],
  queryTerms: string[]
): Promise<Canvas[]> => {
  const canvasList: Canvas[] = [];
  const scansResponse = await client.mget({
    index: config.entityIndex,
    body: {
      ids,
    },
  });

  if (scansResponse) {
    scansResponse.body.docs.forEach((doc: { _source: { entity: Canvas } }) => {
      canvasList.push({
        ...doc._source.entity,
        queryTokens:
          queryTerms !== undefined
            ? filterQueryTokens(doc._source.entity as Canvas, queryTerms)
            : undefined,
      });
    });
  }
  return canvasList;
};

export const filterQueryTokens = (
  canvas: Canvas,
  queryStrings: Array<string | undefined>
): Word[] => {
  const tokens: Word[] = [];
  const terms = queryStrings.map((val) => val?.toLowerCase().trim());

  canvas.annotations[0].items.forEach((item) => {
    item.body.regions.forEach((region) => {
      region.lines.forEach((line) => {
        line.words.forEach((token) => {
          const modernized = (token.modernized || '')
            .toLowerCase()
            .replace(/[^\w\s]/gi, '');
          const original = token.original
            .toLowerCase()
            .replace(/[^\w\s]/gi, '');

          if (terms.includes(modernized || original)) {
            tokens.push(token);
          }
        });
      });
    });
  });

  return tokens;
};

export interface TranscriptionResults {
  ids: string[];
  terms: string[];
  totalHits: number;
}

/**
 * Search for query in a specific inventory and gather all search terms and the scans with results
 */
export const searchInventoryScanIds = async (
  params: InventoryParams
): Promise<TranscriptionResults> => {
  try {
    const result = await client.search({
      index: config.inventoryIndex,
      body: {
        _source: false,
        stored_fields: ['id', 'archive', 'access', 'inventory', 'date'],
        size: 1,
        query: {
          bool: {
            must: [
              {
                nested: {
                  path: 'nest',
                  query:
                    params.query === undefined
                      ? { match_all: {} }
                      : termsQueryFactory(params.query as string),
                  inner_hits: {
                    sort: {
                      'nest.page_id': {
                        order: 'asc',
                      },
                    },
                    size: 1000,
                    from: 0,
                    stored_fields: ['nest.page_id'],
                    highlight: {
                      // NOTE: return all fragments
                      number_of_fragments: 10000,
                      pre_tags: '',
                      post_tags: '',
                      fragment_size: 1,
                      fields: {
                        'nest.page_text': { type: 'unified' },
                        'nest.page_text_modernized': { type: 'unified' },
                        'nest.description_text': { type: 'unified' },
                      },
                    },
                  },
                },
              },
            ],
            filter: [
              {
                term: {
                  _id: params.id,
                },
              },
            ],
          },
        },
      },
    });

    if (result.body.hits.hits.length === 0) {
      return {
        ids: [],
        terms: [],
        totalHits: 0,
      };
    }

    const document = result.body.hits.hits[0] as RawHit;
    const terms = new Set<string>();
    const ids = new Set<string>();

    if (document._id !== params.id) {
      throw new Error('Result doc id does not match request doc id');
    }

    document.inner_hits.nest.hits.hits.forEach((hit: RawInnerHit) => {
      const highlights = [
        ...((hit.highlight && hit.highlight['nest.page_text']) || []),
        ...((hit.highlight && hit.highlight['nest.page_text_modernized']) ||
          []),
      ];

      highlights.forEach((value: string) => terms.add(value));

      if (hit.fields && hit.fields['nest.page_id']) {
        ids.add(hit.fields['nest.page_id'][0]);
      }
    });

    return {
      ids: [...ids],
      totalHits: ids.size,
      terms: [...terms],
    };
  } catch (error) {
    throw new Error(error);
  }
};
