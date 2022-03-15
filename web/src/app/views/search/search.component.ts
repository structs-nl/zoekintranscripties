import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ListComponent } from 'src/app/components/list/list.component';
import { InputRangeValue } from 'src/app/components/range-slider/range-slider.component';
import { SearchParamsService } from 'src/app/services/search-params.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchHelpContentComponent } from '../../components/search-help-content/search-help-content.component';
import {
  TranscriptionService,
  ISearchResults,
  ISearchResult,
  ISearchParams,
  IQueryParams,
  IBucket,
  IExpansion,
  NameType,
} from 'src/app/services/transcription.service';
import { FormControl } from '@angular/forms';

const sortOptions = [
  {
    value: 'relevance',
    name: 'Relevantie',
  },
  {
    value: 'date-desc',
    name: 'Datum (aflopend)',
  },
  {
    value: 'date-asc',
    name: 'Datum (oplopend)',
  },
  {
    value: 'alphabet-asc',
    name: 'Alfabet (oplopend)',
  },
  {
    value: 'alphabet-desc',
    name: 'Alfabet (aflopend)',
  },
];

export const flattenSuggestions = (
  suggestions: Record<string, IExpansion[]>
): Record<string, string[]> => {
  return Object.entries(suggestions).reduce(
    (list, [key, expansions]) => ({
      ...list,
      [key]: expansions
        .map((exp) => exp.synonym)
        .reduce(
          (arr: string[], currentArr: string[]) => [
            ...new Set([...arr, ...currentArr]),
          ],
          []
        ),
    }),
    {}
  );
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('list', { static: true }) list?: ListComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();
  search: FormControl = new FormControl('');
  inventory: FormControl = new FormControl('');

  sortOptions = sortOptions;
  resetFiltersDisabled = true;
  currentRange?: [number, number];
  offset = 0;
  limit = 10;
  totalHits?: number;
  hits: ISearchResult[] = [];
  expansions: Record<string, IExpansion[]> | undefined;
  loading = false;
  error: boolean | string = false;
  showFilters = false;
  params: IQueryParams;
  allExpansions: Record<string, string[]> = {};

  histogramInterval = 0;
  histogramData: { count: number; label: number }[] = [];
  hierarchyData: IBucket[] = [];
  nameTypeData?: IBucket[] = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private client: TranscriptionService,
    private searchParams: SearchParamsService,
    private title: Title,
    private meta: Meta,
    private dialog: MatDialog
  ) {
    this.params = this.searchParams.params;
    this.resetFiltersDisabled = this.isPristine();
    this.title.setTitle('Zoeken in transcripties | Nationaal Archief');
    this.meta.updateTag(
      {
        property: 'og:title',
        content: 'Zoeken in transcripties | Nationaal Archief',
      },
      'property="og:title"'
    );
    this.meta.updateTag(
      { property: 'og:image', content: 'assets/images/transcripties.jpg' },
      'property="og:image"'
    );
  }

  ngOnInit(): void {
    this.searchParams.params$
      .pipe(
        tap((params) => {
          this.list?.reset();
          this.params = params;
          this.currentRange =
            params.from && params.to ? [params.from, params.to] : undefined;
          this.resetFiltersDisabled = this.isPristine();
          this.error = false;
          this.offset = 0;
          this.loading = true;
        }),
        switchMap(() =>
          this.client
            .search({
              ...this.params,
              limit: 10,
              offset: 0,
            })
            .pipe(catchError((error) => this.handleError(error)))
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((response) => this.handleResponse(response));

    this.inventory.valueChanges
      .pipe(
        filter((value) => value.length === 0),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.searchParams.update({
          inventory: undefined,
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  isPristine(): boolean {
    return (
      this.params.nameType === undefined &&
      this.params.descriptions.length === 0 &&
      this.params.sort === 'relevance' &&
      this.params.from === undefined &&
      this.params.inventory === undefined &&
      this.params.to === undefined
    );
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;

    this.searchParams.update({
      sort: target.value as ISearchParams['sort'],
    });
  }

  handleError(error: string): Observable<void> {
    this.error = error;
    this.loading = false;
    return EMPTY;
  }

  handleResponse(response: ISearchResults | void): void {
    if (!response) {
      return;
    }

    this.loading = false;
    this.hits = response.hits;
    this.expansions = response.expansions;
    this.allExpansions =
      response.expansions && flattenSuggestions(response.expansions);
    this.totalHits = response.total;
    this.hierarchyData = response.aggregations.descriptions.buckets;
    this.nameTypeData = response.aggregations.nameTypes?.buckets;
    this.histogramInterval = Number(
      response.aggregations.histogram.interval.slice(0, -1)
    );
    this.histogramData = response.aggregations.histogram.buckets.map((b) => ({
      label: Number(b.label),
      count: b.count,
    }));

    this.searchParams.updateStorage({
      expandedQuery: response.query,
    });
  }

  handleFetchMoreResponse(response: ISearchResults | void): void {
    if (!response) {
      return;
    }

    this.loading = false;
    this.hits = response.hits;
  }

  onFetchMoreData(): void {
    if (this.loading) {
      return;
    }

    // NOTE: do not attempt to load more if there is no more
    if (this.totalHits && this.offset > this.totalHits) {
      return;
    }

    this.offset = this.offset + this.limit;
    this.loading = true;

    this.client
      .search({
        ...this.params,
        limit: 10,
        offset: this.offset,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => this.handleFetchMoreResponse(response));
  }

  changeQuery(query: string): void {
    this.router.navigate([], {
      queryParams: {
        query,
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }

  onChangeExpansions(expansions: Record<string, string[]>): void {
    this.searchParams.update({
      expansions,
    });
  }

  onChangeCheckbox(archives: string[], attribute: string): void {
    this.searchParams.update({
      [attribute]: archives,
    });
  }

  onSubmitInventory(): void {
    this.searchParams.update({
      inventory: this.inventory.value || undefined,
    });
  }

  onTypeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const types = new Set(this.params.nameType);

    if (target.checked) {
      types.add(target.name as NameType);
    } else {
      types.delete(target.name as NameType);
    }

    this.searchParams.update({
      nameType: [...types],
    });
  }

  openDialog(): void {
    this.dialog.open(SearchHelpContentComponent, {
      restoreFocus: false,
      ariaLabel: 'Zoekhulp',
    });
  }

  reset(): void {
    this.searchParams.reset({
      query: this.params.query,
      expandedQuery: this.params.expandedQuery,
    });
  }

  handleRangeInputChange(value: InputRangeValue): void {
    this.searchParams.update({
      from: value[0],
      to: value[1],
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
}
