import {
  Expansion,
  Bucket,
  SearchResult,
  Highlight,
  SearchAggregations,
  RawHit,
  RawInnerHit,
  RawSuggestionHit,
  RawTreeBucket,
} from './model';

const mergeSuggestionBySource = (list: Expansion[]): Expansion[] => {
  const sourceMap = new Map<string, Expansion>();

  list.forEach((expansion) => {
    if (sourceMap.has(expansion.source)) {
      const existing = sourceMap.get(expansion.source) as Expansion;

      sourceMap.set(expansion.source, {
        ...expansion,
        synonym: [...existing.synonym, ...expansion.synonym],
      });
    } else {
      sourceMap.set(expansion.source, expansion);
    }
  });

  return [...sourceMap.values()];
};

export const normalizeExpansions = (
  hits: RawSuggestionHit[]
): Record<string, Expansion[]> => {
  return hits.reduce(
    (
      expansions: Record<string, Expansion[]>,
      { _source: { suggestion, link, source, synonym } }: RawSuggestionHit
    ) => {
      if (expansions[suggestion] === undefined) {
        return {
          ...expansions,
          [suggestion]: [
            {
              link,
              source,
              synonym,
            },
          ],
        };
      }

      return {
        ...expansions,
        [suggestion]: mergeSuggestionBySource([
          ...expansions[suggestion],
          {
            link,
            source,
            synonym,
          },
        ]),
      };
    },
    {}
  );
};

const highlightTypeMapping: Record<string, string> = {
  'nest.page_text': 'original',
  'nest.page_text_modernized': 'modern',
  'nest.description_text': 'description',
};

export const normalizeHighlights = (rawHits: any): Highlight[] => {
  return rawHits
    .map((scan: RawInnerHit) => {
      const highlights: Highlight[] = [];
      if (!scan.highlight) {
        return [];
      }

      Object.entries<string[]>(scan.highlight)
        .sort()
        .forEach(([key, value]) => {
          value.forEach((highlight: string) => {
            const page =
              scan.fields &&
              scan.fields['nest.page_id'] &&
              scan.fields['nest.page_id'][0];

            highlights.push({
              type: highlightTypeMapping[key] as Highlight['type'],
              pageNr: page && page.slice(page.lastIndexOf('/') + 1),
              text: highlight,
              page,
            });
          });
        });

      return highlights;
    })
    .reduce((all: any[], currentHit: any[][]) => [...all, ...currentHit], []);
};

const normalizeDate = (date: string[] | undefined): string[] => {
  if (!date) {
    return [];
  }

  if (date.length >= 2) {
    return [date[0], date[date.length - 1]];
  }

  return date;
};

export const highlightText = (text: string, terms: string[]): string => {
  const regex = new RegExp(terms.join('|'), 'gi');
  const match = text.match(regex);

  if (!match || terms.length === 0) {
    return text;
  }

  return text.replace(regex, (matched) => `<strong>${matched}</strong>`);
};

export const normalizeHit = (expansions: string[]) => (
  hit: RawHit
): SearchResult => {
  return {
    id: hit._id,
    access: hit.fields?.access_title?.[0] || '',
    archive: hit.fields?.archive_title?.[0] || '',
    inventory: hit.fields?.inventory_id?.[0] || '',
    accessId: hit.fields?.access_id?.[0] || '',
    archiveId: hit.fields?.archive_id?.[0] || '',
    date: normalizeDate(hit.fields?.date),
    totalHits: hit.inner_hits.nest.hits.total.value,
    highlights: normalizeHighlights(hit.inner_hits.nest.hits.hits),
    title: highlightText(hit.fields?.inventory_title?.[0], expansions) || '',
  };
};

export const normalizeDateBucket = (bucket: {
  key: string;
  doc_count: number;
}): Bucket => {
  const year = String(new Date(bucket.key).getFullYear());

  return {
    count: bucket.doc_count,
    label: year,
    value: year,
  };
};

const normalizeTreeBucket = (bucket: RawTreeBucket): Bucket => {
  return {
    value: bucket.key,
    label: bucket.title.buckets[0].key,
    count: bucket.doc_count,
  };
};

const walkTree = (tree: Bucket[], bucket: Bucket) => {
  if (tree.length === 0) {
    tree.push(bucket);
    return;
  }

  const findParent = tree.find(
    (node) => bucket.value.startsWith(node.value) && bucket.value !== node.value
  );

  if (findParent && findParent.children) {
    walkTree(findParent.children, bucket);
  } else {
    tree.push(bucket);
  }
};

export const normalizeTreeBuckets = (
  buckets: Array<RawTreeBucket>
): Bucket[] => {
  const tree: Bucket[] = [];

  buckets.forEach((rawBucket) => {
    walkTree(tree, normalizeTreeBucket(rawBucket));
  });

  return tree;
};

export const checkForChildren = (buckets: Bucket[]): Bucket[] => {
  return buckets.map((bucket) => ({
    ...bucket,
    hasChildren: true,
  }));
};

export const normalizeAggs = (aggs: any): SearchAggregations => {
  return {
    histogram: {
      interval: aggs.histogram.interval,
      buckets: aggs.histogram.buckets.map(normalizeDateBucket),
    },
    descriptions: {
      buckets: checkForChildren(
        normalizeTreeBuckets(aggs.description.archives.archives.buckets)
      ),
    },
    nameTypes:
      aggs.nameTypes &&
      aggs.nameTypes.buckets.location.doc_count +
        aggs.nameTypes.buckets.person.doc_count +
        aggs.nameTypes.buckets.time.doc_count >
        0
        ? {
            buckets: [
              {
                value: 'location',
                label: 'Locaties',
                count: aggs.nameTypes.buckets.location.inventory.doc_count,
              },
              {
                value: 'person',
                label: 'Personen',
                count: aggs.nameTypes.buckets.person.inventory.doc_count,
              },
              {
                value: 'time',
                label: 'Tijdsaanduidingen',
                count: aggs.nameTypes.buckets.time.inventory.doc_count,
              },
            ]
              .filter((bucket) => bucket.count > 0)
              .sort((a, b) => b.count - a.count),
          }
        : undefined,
  };
};
