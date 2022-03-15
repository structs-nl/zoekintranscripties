import { Expansion, NameType, SearchParams } from './model';

export const escapeRegex = (string: string): string => {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export const getParentsOfArchives = (parents: string[]): string[] => {
  const uniqueParents = new Set<string>();

  parents.forEach((archive) => {
    getParentsOfArchive(archive).forEach((parent) => uniqueParents.add(parent));
  });

  return [...uniqueParents];
};

export const getParentsOfArchive = (archive: string): string[] => {
  const parents: string[] = [];
  const parts = archive.split('|');

  parts.forEach((part, index) => {
    parents.push(parts.slice(0, index).join('|'));
  });

  // NOTE: start at index 2 because the first values are empty.
  return parents.slice(2);
};

const nameTypeMap: Record<NameType, string> = {
  person: 'nest.entity_person',
  location: 'nest.entity_location',
  time: 'nest.entity_time',
};

export const postFilterFactory = (params: SearchParams): any[] => {
  return [
    params.descriptions !== undefined &&
      params.descriptions.length > 0 && {
        nested: {
          path: 'nest',
          query: {
            terms: {
              'nest.description_path': params.descriptions,
            },
          },
        },
      },
    params.inventory !== undefined &&
      params.inventory.length > 0 && {
        term: {
          inventory_id: params.inventory,
        },
      },
  ].filter(Boolean);
};

export const aggsFilterFactory = (params: SearchParams): any[] => {
  return [
    params.from &&
      params.to && {
        range: {
          date: {
            gte: params.from,
            lte: params.to,
          },
        },
      },
    params.nameType && params.query
      ? {
          nested: {
            path: 'nest',
            query: {
              bool: {
                should: params.nameType.map((nameType) => ({
                  term: {
                    [nameTypeMap[nameType]]: {
                      value: params.query,
                      case_insensitive: true,
                    },
                  },
                })),
              },
            },
          },
        }
      : undefined,
  ].filter(Boolean);
};

export const sortFactory = (
  value?: SearchParams['sort']
): string | Record<string, any> => {
  const map: Record<string, any> = {
    'alphabet-asc': { inventory_title: { order: 'asc' } },
    'alphabet-desc': { inventory_title: { order: 'desc' } },
    'date-asc': { date: { order: 'asc' } },
    'date-desc': { date: { order: 'desc' } },
  };

  return (value && map[value]) || '_score';
};

export const termsQueryFactory = (query: string): Record<string, any> => {
  return {
    bool: {
      should: [
        {
          query_string: {
            query,
            default_field: 'nest.description_text',
            default_operator: 'AND',
            boost: 2,
          },
        },
        {
          query_string: {
            query,
            default_field: 'nest.page_text',
            default_operator: 'AND',
          },
        },
        {
          query_string: {
            query,
            default_field: 'nest.page_text_modernized',
            default_operator: 'AND',
          },
        },
        // NOTE: boost inventories that have a match with a named entity field
        // {
        //   term: {
        //     'nest.entity_location': {
        //       value: query,
        //       boost: 10,
        //       case_insensitive: true,
        //     },
        //   },
        // },
        // {
        //   term: {
        //     'nest.entity_time': {
        //       value: query,
        //       boost: 10,
        //       case_insensitive: true,
        //     },
        //   },
        // },
        // {
        //   term: {
        //     'nest.entity_person': {
        //       value: query,
        //       boost: 10,
        //       case_insensitive: true,
        //     },
        //   },
        // },
      ],
    },
  };
};

export const queryFactory = (
  value: SearchParams['query']
): Record<string, any> => {
  const query: any =
    !value || value.length === 0
      ? {
          match_all: {},
        }
      : termsQueryFactory(value);

  return {
    bool: {
      must: {
        nested: {
          path: 'nest',
          query,
          inner_hits: {
            stored_fields: ['nest.page_id'],
            highlight: {
              number_of_fragments: 10,
              pre_tags: ['<strong>'],
              post_tags: ['</strong>'],
              fields: {
                'nest.page_text': { type: 'unified' },
                'nest.description_text': { type: 'unified' },
              },
            },
          },
        },
      },
    },
  };
};

export const nameTypeAggs = (field: string, value: string) => ({
  filter: {
    term: {
      [field]: {
        value,
        case_insensitive: true,
      },
    },
  },
  aggs: {
    inventory: {
      reverse_nested: {},
      aggs: {
        inventory: {
          terms: { field: 'inventory_title' },
        },
      },
    },
  },
});

export const flattenExpansions = (
  expansions: Record<string, Expansion[]>
): string[] => {
  const terms = new Set<string>();

  Object.keys(expansions).forEach((key) => {
    const expansionList = expansions[key];

    expansionList.forEach((expansion) => {
      expansion.synonym.forEach((term) => {
        terms.add(term);
      });
    });
  });

  return [...terms];
};
