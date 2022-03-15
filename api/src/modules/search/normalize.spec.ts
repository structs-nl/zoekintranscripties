import 'jasmine';
import { Bucket, Highlight, SearchResult } from './model';
import * as normalizers from './normalize';

describe('Search normalizers', () => {
  it('normalizeExpansions', () => {
    const input = [
      {
        _index: 'suggestions',
        _type: '_doc',
        _id: 'WNT_NEW20151210_batavia',
        _score: 1,
        _source: {
          suggestion: 'batavia',
          link:
            'http://gtb.ivdnt.org/iWDB/search?actie=article&wdb=WNT&id=NEW20151210_batavia&lemmodern=batavia&domein=0&conc=true',
          source: 'WNT',
          kind: 'NOU-P',
          synonym: ['batavie'],
        },
      },
    ];

    const expected = {
      batavia: [
        {
          link:
            'http://gtb.ivdnt.org/iWDB/search?actie=article&wdb=WNT&id=NEW20151210_batavia&lemmodern=batavia&domein=0&conc=true',
          source: 'WNT',
          synonym: ['batavie'],
        },
      ],
    };

    expect(normalizers.normalizeExpansions(input)).toEqual(expected);
  });

  it('normalizeHighlights', () => {
    const input = [
      {
        _id: 'https://archief.nl/doc/transcriptie/1.04.02/7558',
        highlight: {
          'nest.page_text': [
            'Duplicaat\nparticuliere missive van haar\nhoog Edelens tot <strong>batavia</strong>\naan d’ Edele heeren bewind„\nhebberen',
            "<strong>Batavia</strong> in't Casteel den 1: xber: 1740.\nfeed\nC„ Cluijsensaen.secret:s",
          ],
          'nest.page_text_modernized': [
            'Duplicaat\nparticuliere missive van haar\nhoog Edelens tot <strong>batavia</strong>\naan d’ Edele heeren bewind„\nhebberen',
            "<strong>Batavia</strong> in't Casteel den 1: xber: 1740.\nfeed\nC„ Cluijsensaen.secret:s",
          ],
        },
      },
      {
        _id: 'https://archief.nl/doc/transcriptie/1.04.02/7558',
        highlight: {
          'nest.page_text': [
            'det register\n121. origineele missive van haar\nEd: den gouverneur gene\nraal ende raden van\nIndia tot <strong>batavia</strong>',
            'Chineesen\naan den Cap: dier natie\nalhier geschreeven\n113. origixele Particuliere missive\nvan haar Ed: tot <strong>batavia</strong>',
          ],
          'nest.page_text_modernized': [
            'det register\n121. origineele missive van haar\nEd: den gouverneur gene\nraal ende raden van\nIndia tot <strong>batavia</strong>',
            'Chineesen\naan den Cap: dier natie\nalhier geschreeven\n113. origixele Particuliere missive\nvan haar Ed: tot <strong>batavia</strong>',
          ],
        },
      },
    ];

    const expected: Highlight[] = [
      {
        page: undefined,
        type: 'original',
        text:
          'Duplicaat\nparticuliere missive van haar\nhoog Edelens tot <strong>batavia</strong>\naan d’ Edele heeren bewind„\nhebberen',
      },
      {
        page: undefined,
        type: 'original',
        text:
          "<strong>Batavia</strong> in't Casteel den 1: xber: 1740.\nfeed\nC„ Cluijsensaen.secret:s",
      },
      {
        page: undefined,
        type: 'original',
        text:
          'det register\n121. origineele missive van haar\nEd: den gouverneur gene\nraal ende raden van\nIndia tot <strong>batavia</strong>',
      },
      {
        page: undefined,
        type: 'original',
        text:
          'Chineesen\naan den Cap: dier natie\nalhier geschreeven\n113. origixele Particuliere missive\nvan haar Ed: tot <strong>batavia</strong>',
      },
    ];

    expect(normalizers.normalizeHighlights(input)).toEqual(expected);
  });

  it('normalizeHit', () => {
    const input = {
      _index: 'inventory',
      _type: '_doc',
      _id: 'https://archief.nl/doc/transcriptie/1.04.02/7632',
      _score: 3.1166205,
      fields: {
        date: ['1733-01-01T00:00:00.000Z'],
        archive_title: ['Nationaal Archief, Den Haag'],
        inventory_title: ['-'],
        access_title: ['Verenigde Oostindische Compagnie (VOC)'],
        inventory_id: ['7632'],
        access_id: ['1.04.02'],
        archive_id: ['NL-HaNA'],
      },
      inner_hits: {
        nest: {
          hits: {
            total: { value: 77, relation: 'eq' },
            max_score: 19.712088,
            hits: [
              {
                _index: 'inventory',
                _type: '_doc',
                _id: 'https://archief.nl/doc/transcriptie/1.04.02/7632',
                _nested: { field: 'nest', offset: 476 },
                _score: 19.712088,
                fields: {
                  'nest.page_id': [
                    'https://archief.nl/doc/transcriptie/1.04.02/7632/0471',
                  ],
                },
                highlight: {
                  'nest.page_text': [
                    "15\nMacassar den 18:' Maert 1735:\n0. driie Copia brieveryven gem: hoge regeering\ntot <strong>batavia</strong> aan de ministers",
                    "guneralemssive door de\nhoog Edele heeren 17:' int pakia aan\nhaar Ed: den gouv: generaelende\nraden van jndia tot <strong>batavie</strong>",
                    'ternaten, banjer\nmassing en timor, benevens een\ngedeelte uijt die van malacca\nsumakaswt Cust, souratta, en <strong>batavia</strong>',
                    'Extract uijt de resolutien des Casteels\n<strong>batavia</strong> genomen op den 17:e 8br 1721\n1692 concernerende de gelicentieerde',
                  ],
                  'nest.page_text_modernized': [
                    "15\nMacassar den 18:' Maert 1735:\n0. driie Copia brieveryven gem: hoge regeering\ntot <strong>batavia</strong> aan de ministers",
                    "guneralemssive door de\nhoog Edele heeren 17:' int pakia aan\nhaar Ed: den gouv: generaelende\nraden van jndia tot <strong>batavie</strong>",
                    'ternaten, banjer\nmassing en timor, benevens een\ngedeelte uijt die van malacca\nsumakaswt Cust, souratta, en <strong>batavia</strong>',
                    'Extract uijt de resolutien des Casteels\n<strong>batavia</strong> genomen op den 17:e 8br 1721\n1692 concernerende de gelicentieerde',
                  ],
                },
              },
            ],
          },
        },
      },
    };

    const expected: SearchResult = {
      id: 'https://archief.nl/doc/transcriptie/1.04.02/7632',
      access: 'Verenigde Oostindische Compagnie (VOC)',
      archive: 'Nationaal Archief, Den Haag',
      inventory: '7632',
      date: ['1733-01-01T00:00:00.000Z'],
      totalHits: 77,
      highlights: [
        {
          type: 'original',
          page: 'https://archief.nl/doc/transcriptie/1.04.02/7632/0471',
          text:
            "15\nMacassar den 18:' Maert 1735:\n0. driie Copia brieveryven gem: hoge regeering\ntot <strong>batavia</strong> aan de ministers",
        },
        {
          type: 'original',
          page: 'https://archief.nl/doc/transcriptie/1.04.02/7632/0471',
          text:
            "guneralemssive door de\nhoog Edele heeren 17:' int pakia aan\nhaar Ed: den gouv: generaelende\nraden van jndia tot <strong>batavie</strong>",
        },
        {
          type: 'original',
          page: 'https://archief.nl/doc/transcriptie/1.04.02/7632/0471',
          text:
            'ternaten, banjer\nmassing en timor, benevens een\ngedeelte uijt die van malacca\nsumakaswt Cust, souratta, en <strong>batavia</strong>',
        },
        {
          type: 'original',
          page: 'https://archief.nl/doc/transcriptie/1.04.02/7632/0471',
          text:
            'Extract uijt de resolutien des Casteels\n<strong>batavia</strong> genomen op den 17:e 8br 1721\n1692 concernerende de gelicentieerde',
        },
      ],
      title: '-',
    };

    expect(normalizers.normalizeHit(input)).toEqual(expected);
  });

  it('normalizeDateBucket', () => {
    const input = {
      key: '2010',
      doc_count: 123,
    };
    const expected: Bucket = {
      count: 123,
      label: '2010',
      value: '2010',
    };

    expect(normalizers.normalizeDateBucket(input)).toEqual(expected);
  });

  it('normalizeAggs', () => {
    const input = {
      histogram: {
        buckets: [
          { key_as_string: '1647', key: -10192867200000, doc_count: 6 },
          { key_as_string: '1667', key: -9561715200000, doc_count: 14 },
          { key_as_string: '1687', key: -8930563200000, doc_count: 15 },
          { key_as_string: '1707', key: -8299497600000, doc_count: 41 },
          { key_as_string: '1727', key: -7668345600000, doc_count: 50 },
          { key_as_string: '1747', key: -7037193600000, doc_count: 17 },
          { key_as_string: '1767', key: -6406041600000, doc_count: 21 },
          { key_as_string: '1787', key: -5774889600000, doc_count: 5 },
        ],
        interval: '20y',
      },
      description: {
        meta: {},
        doc_count: 125,
        archives: {
          doc_count: 57427,
          archives: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: '|NL-HaNA',
                doc_count: 122,
                title: {
                  doc_count_error_upper_bound: 0,
                  sum_other_doc_count: 0,
                  buckets: [
                    { key: 'Nationaal Archief, Den Haag', doc_count: 79 },
                    {
                      key: 'NL-HaNA - Nationaal Archief, Den Haag',
                      doc_count: 43,
                    },
                  ],
                },
              },
              {
                key: '|1.04.02',
                doc_count: 1,
                title: {
                  doc_count_error_upper_bound: 0,
                  sum_other_doc_count: 0,
                  buckets: [
                    {
                      key: '1.04.02 - Nationaal Archief, Den Haag',
                      doc_count: 1,
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    };

    const expected = {
      histogram: {
        interval: '20y',
        buckets: [
          { count: 6, label: '1647', value: '1647' },
          { count: 14, label: '1667', value: '1667' },
          { count: 15, label: '1687', value: '1687' },
          { count: 41, label: '1707', value: '1707' },
          { count: 50, label: '1727', value: '1727' },
          { count: 17, label: '1747', value: '1747' },
          { count: 21, label: '1767', value: '1767' },
          { count: 5, label: '1787', value: '1787' },
        ],
      },
      nameTypes: undefined,
      descriptions: {
        buckets: [
          {
            value: '|NL-HaNA',
            label: 'Nationaal Archief, Den Haag',
            count: 122,
            hasChildren: true,
          },
          {
            value: '|1.04.02',
            label: '1.04.02 - Nationaal Archief, Den Haag',
            count: 1,
            hasChildren: true,
          },
        ],
      },
    };
    expect(normalizers.normalizeAggs(input)).toEqual(expected);
  });

  it('normalizeTreeBuckets', () => {
    const input = [
      {
        key: '|NL-HaNA',
        doc_count: 207,
        title: {
          buckets: [
            {
              key: 'Nationaal Archief, Den Haag',
              doc_count: 207,
            },
          ],
        },
      },
      {
        key: '|NL-HaNA|1.04.02',
        doc_count: 190,
        title: {
          buckets: [
            {
              key: 'Verenigde Oostindische Compagnie (VOC)',
              doc_count: 190,
            },
          ],
        },
      },
    ];

    const expected = [
      {
        value: '|NL-HaNA',
        label: 'Nationaal Archief, Den Haag',
        count: 207,
      },
      {
        value: '|NL-HaNA|1.04.02',
        label: 'Verenigde Oostindische Compagnie (VOC)',
        count: 190,
      },
    ];

    expect(normalizers.normalizeTreeBuckets(input)).toEqual(expected);
  });
});
