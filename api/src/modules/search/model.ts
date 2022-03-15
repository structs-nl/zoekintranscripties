export interface SearchResults {
  hits: SearchResult[];
  total: number;
  aggregations: SearchAggregations;
  expansions?: Record<string, Expansion[]>;
  query: string;
}

export interface Expansion {
  link: string;
  source: string;
  synonym: string[];
}

export interface SearchAggregations {
  nameTypes?: {
    buckets: Bucket[];
  };
  histogram: {
    interval: string;
    buckets: Bucket[];
  };
  descriptions: {
    buckets: Bucket[];
  };
}

export interface Bucket {
  count: number;
  label: string;
  value: string;
  hasChildren?: boolean;
  children?: Bucket[];
}

export interface Highlight {
  page?: string;
  text: string;
  type: 'modern' | 'original' | 'description';
}

export interface SearchResult {
  id: string;
  title: string;
  date: string[];
  archive: string;
  access: string;
  inventory: string;
  totalHits?: number;
  highlights: Highlight[];
}

export type NameType = 'person' | 'location' | 'time';

export interface SearchParams {
  query?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
  inventory?: string;
  nameType?: NameType[];
  descriptionPrefix?: string;
  descriptions?: string[];
  expansions?: {
    [key: string]: string[];
  };
  sort?:
    | 'relevance'
    | 'date-asc'
    | 'date-desc'
    | 'alphabet-asc'
    | 'alphabet-desc';
}

export interface RawInnerHit {
  highlight?: any;
  fields: {
    'nest.page_id': string[];
  };
}
export interface RawHit {
  _id: string;
  fields: {
    access_title: string[];
    archive_title: string[];
    inventory_title: string[];
    inventory_id: string[];
    date: string[];
  };
  inner_hits: {
    nest: {
      hits: {
        total: {
          value: number;
        };
        hits: Array<RawInnerHit>;
      };
    };
  };
}
export interface RawSuggestionHit {
  _source: {
    suggestion: string;
    link: string;
    source: string;
    synonym: string[];
  };
}

export interface RawTreeBucket {
  key: string;
  doc_count: number;
  title: {
    buckets: {
      key: string;
      doc_count: number;
    }[];
  };
}
