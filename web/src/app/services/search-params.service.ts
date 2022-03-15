import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IQueryParams, ISearchParams } from './transcription.service';

const initialState: ISearchParams = {
  limit: 10,
  offset: 0,
  descriptions: [],
  nameType: undefined,
  sort: 'relevance',
  expansions: {},
  query: undefined,
  expandedQuery: undefined,
  from: undefined,
  to: undefined,
  inventory: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class SearchParamsService {
  public params: ISearchParams;
  private paramsKey = 'search-params';
  public params$: BehaviorSubject<ISearchParams>;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) {
      this.params = initialState;
      this.params$ = new BehaviorSubject(this.params);
      return;
    }

    const storageItem = window.sessionStorage.getItem(this.paramsKey);

    this.params = storageItem ? JSON.parse(storageItem) : initialState;
    this.params$ = new BehaviorSubject(this.params);

    this.route.queryParams
      .pipe(
        map((params) => params.query),
        filter((query: string) => this.params.query !== query)
      )
      .subscribe((value) => {
        this.update({
          nameType: undefined,
          expansions: undefined,
          expandedQuery: undefined,
          query: value,
        });
      });
  }

  public reset(params: Partial<IQueryParams> = {}): void {
    this.update({
      ...initialState,
      ...params,
    });
  }

  public updateStorage(params: Partial<IQueryParams>): void {
    this.params = {
      ...this.params,
      ...params,
    };

    if (this.isBrowser) {
      window.sessionStorage.setItem(
        this.paramsKey,
        JSON.stringify(this.params)
      );
    }
  }

  public update(params: Partial<IQueryParams>): void {
    this.updateStorage(params);
    this.params$.next(this.params);
  }
}
