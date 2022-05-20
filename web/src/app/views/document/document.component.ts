import { Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  IInventory,
  TranscriptionService,
} from 'src/app/services/transcription.service';
import { FormControl } from '@angular/forms';
import { DocumentQuery } from 'src/app/state/document.query';
import { DocumentStore } from 'src/app/state/document.store';
import { SearchParamsService } from 'src/app/services/search-params.service';

export const getIdFromParams = (params: Params): string => {
  if (params.archiveName === 'NL-HaNA') {
    return `https://archief.nl/doc/transcriptie/${params.accessId}/${params.inventoryId}`.toLowerCase();
  }

  return `https://archief.nl/doc/transcriptie/${params.archiveName}/${params.accessId}/${params.inventoryId}`.toLowerCase();
};

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  queryParams$: Observable<Params>;
  document$: Observable<IInventory | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  hasQuery = false;
  isInitLoading = true;
  limit$: Observable<number>;
  offset$: Observable<number>;
  showParam: string;
  search: FormControl = new FormControl('');

  constructor(
    private documentQuery: DocumentQuery,
    private route: ActivatedRoute,
    private router: Router,
    private service: TranscriptionService,
    private documentStore: DocumentStore,
    private searchParams: SearchParamsService,
    private title: Title,
    private meta: Meta
  ) {
    this.search.setValue(this.route.snapshot.queryParams.query || '');
    this.hasQuery = this.route.snapshot.queryParams.query?.length > 0;
    this.showParam = this.route.snapshot.queryParams.show;
    this.limit$ = this.documentQuery.getLimit();
    this.offset$ = this.documentQuery.getOffset();

    this.queryParams$ = this.route.queryParams;
    this.document$ = this.documentQuery.getDocument();
    this.loading$ = this.documentQuery.isLoading();
    this.error$ = this.documentQuery.getError();

    if (!this.route.firstChild) {
      return;
    }

    combineLatest([
      this.route.firstChild.params,
      this.route.queryParams,
      this.limit$,
      this.offset$,
      this.searchParams.params$,
    ])
      .pipe(
        map(([params, queryParams, limit, offset, searchParams]) => {
          return {
            limit,
            offset,
            query: queryParams.query as string,
            id: getIdFromParams(params),
            expansions: searchParams.expansions,
          };
        }),
        tap((params) => {
          this.search.setValue(params.query);
          this.hasQuery = params.query ? params.query.length > 0 : false;
        }),
        distinctUntilChanged(
          (previous, current) =>
            previous.limit === current.limit &&
            previous.offset === current.offset &&
            previous.query === current.query &&
            previous.id === current.id
        ),
        switchMap((queryParams) => {
          return this.service.getDocument({
            id: queryParams.id,
            limit: queryParams.limit,
            offset: Math.max(queryParams.offset, 0),
            expansions: queryParams.expansions,
            query: queryParams.query ? String(queryParams.query) : undefined,
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((document) => {
        this.setMetaData(document);
      });
  }

  setMetaData(document: { inventory: IInventory }): void {
    if (
      document.inventory.hierarchies &&
      document.inventory.hierarchies.length > 0 &&
      document.inventory.hierarchies[0].title
    ) {
      this.title.setTitle(
        `${document.inventory.hierarchies[0].title} | Nationaal Archief`
      );
      this.meta.updateTag(
        {
          property: 'og:title',
          content: `${document.inventory.hierarchies[0].title} | Nationaal Archief`,
        },
        'property="og:title"'
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    this.documentStore.set([]);
    this.documentStore.update({
      document: undefined,
    });
  }

  onSubmitQuery(event: Event): void {
    event.preventDefault();

    this.hasQuery = this.search.value.length > 0;

    this.updateQueryParams({
      query: this.search.value,
      tab: undefined,
      index: undefined,
    });
  }

  updateQueryParams(params: Record<string, unknown>): void {
    this.router.navigate(['/document'], {
      queryParams: params,
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
