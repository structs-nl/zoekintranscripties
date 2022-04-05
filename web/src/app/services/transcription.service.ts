import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EntityType, JsonParserService } from './json-parser.service';
import { DocumentStore } from '../state/document.store';
import { PageResponseLD } from '../models/page';
import { DocumentResponseLD } from '../models/document';
import { SearchParamsService } from './search-params.service';

export interface ICompletion {
  label?: string;
  value: string;
}

export interface IInventoryParams {
  id: string;
  limit: number;
  offset: number;
  query?: string;
  expansions?: {
    [key: string]: string[];
  };
}

export interface IArchiveParams {
  query: string;
}
export type NameType = 'person' | 'location' | 'time';
export interface IQueryParams {
  query?: string;
  expandedQuery?: string;
  descriptions: string[];
  inventory?: string;
  nameType?: NameType[];
  from?: number;
  expansions: Record<string, string[]>;
  to?: number;
  sort?:
    | 'relevance'
    | 'date-asc'
    | 'date-desc'
    | 'alphabet-asc'
    | 'alphabet-desc';
}

export interface ISearchParams extends IQueryParams {
  limit: number;
  offset: number;
  descriptionPrefix?: string;
}

export interface ISearchResult {
  id: string;
  title: string;
  date: string[];
  archive: string;
  access: string;
  totalHits?: number;
  highlights: {
    page?: string;
    text: string;
    type: 'modern' | 'original' | 'description';
  }[];
}

export interface ISearchResults {
  hits: ISearchResult[];
  total: number;
  aggregations: ISearchAggregations;
  expansions: Record<string, IExpansion[]>;
  query: string;
}

export interface IExpansion {
  link: string;
  source: string;
  synonym: string[];
}

export interface ISearchAggregations {
  nameTypes?: {
    buckets: IBucket[];
  };
  histogram: {
    interval: string;
    buckets: IBucket[];
  };
  descriptions: {
    buckets: IBucket[];
  };
}

export interface IBucket {
  count: number;
  value: string;
  children?: IBucket[];
  label: string;
}

export interface IRecord {
  title: string;
  id?: string;
  date?: string;
  description?: string;
}

export interface IInventoryHierarchy {
  archives: IRecord[];
  date: number[];
  access?: string;
  archive?: string;
  inventory?: string;
  title: string;
}
export interface IInventory {
  id: string;
  items: string[];
  totalPages: number;
  totalHits?: number;
  queryTerms?: string[];
  resultIds?: string[];
  hierarchies: IInventoryHierarchy[];
}

export interface IToken {
  coords?: Array<Array<string>>;
  type?: EntityType;
  original: string;
  modernized: string;
}

export interface IRegion {
  lines: IToken[][];
  coords: Array<Array<string>>;
}
export interface ITranscription {
  id: string;
  label: string;
  defaultImage: string;
  image: string;
  image_width: number;
  image_height: number;
  regions: IRegion[];
  queryTokens: IToken[];
  filename?: string;
  source?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranscriptionService {
  constructor(
    @Inject('apiBaseUrl') private apiBaseUrl: string,
    private documentStore: DocumentStore,
    private http: HttpClient,
    private parser: JsonParserService,
    private searchParams: SearchParamsService
  ) {}

  private handleError() {
    return throwError('Er ging iets fout. Probeer het later opnieuw.');
  }

  getTranscription(id: string): Observable<ITranscription> {
    return this.http
      .post<PageResponseLD>(`${this.apiBaseUrl}/entity?id=${id}`, {
        query:
          this.searchParams.params.expandedQuery ||
          this.searchParams.params.query,
      })
      .pipe(
        map((response) => this.parser.parseTranscriptionResponse(response)),
        tap((transcription) => {
          this.documentStore.add(transcription);
          this.documentStore.setActive(transcription.id);
        }),
        catchError(this.handleError)
      );
  }

  getDocument(
    params: IInventoryParams,
    ignoreStore = false
  ): Observable<{ inventory: IInventory; transcriptions: ITranscription[] }> {
    const urlParams = new HttpParams({
      fromObject: {
        id: params.id,
        limit: String(params.limit || 10),
        offset: String(params.offset || 0),
      },
    });

    if (!ignoreStore) {
      this.documentStore.setLoading(true);
    }

    return this.http
      .post<DocumentResponseLD>(
        `${this.apiBaseUrl}/inventory`,
        {
          query:
            this.searchParams.params.expandedQuery ||
            this.searchParams.params.query,
        },
        {
          params: urlParams,
        }
      )
      .pipe(
        map((response) => this.parser.parseInventoryResponse(response)),
        tap((inventory) => {
          if (!ignoreStore) {
            this.documentStore.update({
              document: inventory.inventory,
              offset: params.offset,
            });
            this.documentStore.set(inventory.transcriptions);
            this.documentStore.setLoading(false);
          }
        }),
        catchError((error) => {
          if (!ignoreStore) {
            this.documentStore.setError(error);
            this.documentStore.setLoading(false);
          }
          return this.handleError();
        })
      );
  }

  archives(params: IArchiveParams): Observable<IBucket[]> {
    const urlParams = new HttpParams({
      fromObject: {
        query: String(params.query),
      },
    });

    return this.http
      .get<IBucket[]>(`${this.apiBaseUrl}/archives`, {
        params: urlParams,
      })
      .pipe(catchError(this.handleError));
  }

  descriptions(params: IArchiveParams): Observable<IBucket[]> {
    const urlParams = new HttpParams({
      fromObject: {
        query: String(params.query),
      },
    });

    return this.http
      .get<IBucket[]>(`${this.apiBaseUrl}/descriptions`, {
        params: urlParams,
      })
      .pipe(catchError(this.handleError));
  }

  search({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expandedQuery,
    ...searchParams
  }: ISearchParams): Observable<ISearchResults> {
    return this.http
      .post<ISearchResults>(`${this.apiBaseUrl}/search`, searchParams)
      .pipe(catchError(this.handleError));
  }
}
