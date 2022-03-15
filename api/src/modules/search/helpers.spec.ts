import 'jasmine';
import * as helpers from './helpers';

describe('Search helpers', () => {
  it('aggregation filter factory', () => {
    const expected = [
      {
        range: {
          date: {
            gte: 2000,
            lte: 2010,
          },
        },
      },
    ];

    expect(helpers.aggsFilterFactory(2000, 2010)).toEqual(expected);
    expect(helpers.aggsFilterFactory(2000)).toEqual([]);
    expect(helpers.aggsFilterFactory(undefined, 2010)).toEqual([]);
    expect(helpers.aggsFilterFactory()).toEqual([]);
  });

  it('getParentsOfArchive', () => {
    const input = '|NL-HaNA|1.04.02|Deel II|Deel II/E';

    const expected = [
      '|NL-HaNA',
      '|NL-HaNA|1.04.02',
      '|NL-HaNA|1.04.02|Deel II',
    ];

    expect(helpers.getParentsOfArchive(input)).toEqual(expected);
  });

  it('getParentsOfArchives', () => {
    const input = ['|NL-HaNA|1.04.02|Deel II|Deel II/E'];

    const expected = [
      '|NL-HaNA',
      '|NL-HaNA|1.04.02',
      '|NL-HaNA|1.04.02|Deel II',
    ];

    expect(helpers.getParentsOfArchives(input)).toEqual(expected);
  });

  it('postFilterFactory', () => {
    expect(
      helpers.postFilterFactory({
        descriptions: ['|NL-HaNA'],
        inventory: '7528',
      })
    ).toEqual([
      {
        nested: {
          path: 'nest',
          query: {
            terms: {
              'nest.description_path': ['|NL-HaNA'],
            },
          },
        },
      },
      {
        term: {
          inventory_id: '7528',
        },
      },
    ]);

    expect(helpers.postFilterFactory({ descriptions: ['|NL-HaNA'] })).toEqual([
      {
        nested: {
          path: 'nest',
          query: {
            terms: {
              'nest.description_path': ['|NL-HaNA'],
            },
          },
        },
      },
    ]);

    expect(helpers.postFilterFactory({ inventory: '7528' })).toEqual([
      {
        term: {
          inventory_id: '7528',
        },
      },
    ]);

    expect(helpers.postFilterFactory({})).toEqual([]);
  });

  it('queryFactory', () => {
    expect(helpers.queryFactory('')).toEqual({
      bool: {
        must: {
          nested: {
            path: 'nest',
            query: {
              match_all: {},
            },
            inner_hits: {
              stored_fields: ['nest.page_id'],
              highlight: {
                number_of_fragments: 10,
                pre_tags: ['<strong>'],
                post_tags: ['</strong>'],
                fields: {
                  'nest.page_text': { type: 'unified' },
                  'nest.page_text_modernized': { type: 'unified' },
                  'nest.description_text': { type: 'unified' },
                },
              },
            },
          },
        },
      },
    });

    expect(helpers.queryFactory('batavia')).toEqual({
      bool: {
        must: {
          nested: {
            path: 'nest',
            query: helpers.termsQueryFactory('batavia'),
            inner_hits: {
              stored_fields: ['nest.page_id'],
              highlight: {
                number_of_fragments: 10,
                pre_tags: ['<strong>'],
                post_tags: ['</strong>'],
                fields: {
                  'nest.page_text': { type: 'unified' },
                  'nest.page_text_modernized': { type: 'unified' },
                  'nest.description_text': { type: 'unified' },
                },
              },
            },
          },
        },
      },
    });
  });

  it('sortFactory', () => {
    expect(helpers.sortFactory()).toEqual('_score');
    expect(helpers.sortFactory('alphabet-asc')).toEqual({
      inventory_title: { order: 'asc' },
    });
    expect(helpers.sortFactory('alphabet-desc')).toEqual({
      inventory_title: { order: 'desc' },
    });
    expect(helpers.sortFactory('date-asc')).toEqual({ date: { order: 'asc' } });
    expect(helpers.sortFactory('date-desc')).toEqual({
      date: { order: 'desc' },
    });
  });

  it('termsQueryFactory', () => {
    const query = 'batavia';

    const expected = {
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
        ],
      },
    };

    expect(helpers.termsQueryFactory(query)).toEqual(expected);
  });
});
