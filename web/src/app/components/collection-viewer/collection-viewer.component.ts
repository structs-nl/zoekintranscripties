import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import {
  IInventory,
  ITranscription,
  TranscriptionService,
} from '../../services/transcription.service';
import { NaViewer } from './na-viewer';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { getIdFromParams, Parameters } from 'src/app/views/scan/scan.component';

/**
 * The collection viewer shows the scans of an entire inventory
 * It uses the openseadragon collection mode
 * - Caution: for serverside rendering it is important only to load the osd packages in the client
 * - Also caution: OSD doesn't seem to play well with TypeScript. Hence the 'any' type definitions.
 * - All data fetching for infinitely scrolling in OSD is handled here. New scans are appended or prepended to the existing list.
 */
@Component({
  selector: 'collection-viewer',
  templateUrl: './collection-viewer.component.html',
  styleUrls: ['./collection-viewer.component.css'],
})
export class CollectionViewerComponent implements OnInit, OnChanges, OnDestroy {
  isBrowser = false;
  documentId: string;
  naViewer?: NaViewer;
  queryParams?: ParamMap;
  index?: number;
  isShowResults = false;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pageIndex: FormControl = new FormControl();
  query?: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  hasNextResult$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  hasPreviousResult$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  /**
   * Offset for appending items to the end
   */
  offset = 0;

  /**
   * Offset for prepending items at the start
   */
  offsetStart?: number;

  @Input() limit = 10;
  @Input() manifest: IInventory = {} as IInventory;
  @Input() transcriptions: ITranscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transcriptionService: TranscriptionService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.documentId = getIdFromParams(this.route.snapshot.params as Parameters);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    // NOTE: this is where OSD is loaded
    Promise.all([import('openseadragon'), import('./na-viewer')]).then(
      ([osd, na]) => {
        this.initViewer(osd.Viewer, na.NaViewer);
      }
    );

    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((queryParams) => {
        this.queryParams = queryParams;
        this.query = queryParams.get('query') || undefined;
        this.isShowResults = queryParams.get('show') === 'results';
        this.index = Number(queryParams.get('index'));
      });
  }

  ngOnDestroy(): void {
    if (this.naViewer) {
      this.naViewer.reset();
    }

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Changes basically happen when the inventory or query changes
   */
  async ngOnChanges(): Promise<void> {
    if (!this.naViewer) {
      return;
    }

    this.offset = 0;
    this.offsetStart = 0;
    this.naViewer.reset();

    await this.naViewer.load({
      items: this.transcriptions,
      refreshOverlays: true,
      activeIndex: 0,
      offset: 0,
    });
  }

  /**
   * Initializes the viewer, adds custom click event for navigation to the scan page and navigates to initial page
   */
  initViewer(osdViewer: any, naViewer: typeof NaViewer): void {
    const viewer = new osdViewer({
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
      id: 'collection-viewer',
      collectionMode: true,
      collectionRows: 1,
      collectionTileMargin: 20,
      collectionTileSize: 256,
      maxZoomLevel: 0.5,
      animationTime: 0.5,
      preserveViewport: true,
      zoomInButton: 'zoom-in',
      zoomOutButton: 'zoom-out',
      rotateLeftButton: 'rotate-left',
      rotateRightButton: 'rotate-right',
      showRotationControl: true,
      tabIndex: 0,
    });

    viewer.addHandler('canvas-click', (event: OpenSeadragon.ViewerEvent) => {
      event.preventDefaultAction = true;

      if (event.quick) {
        const target = (event as any).originalEvent.target;

        if (target.matches('a')) {
          this.router.navigate(
            [
              '/document',
              this.manifest.archiveName,
              this.manifest.accessId,
              this.manifest.inventoryId,
              target.dataset.id,
            ],
            {
              queryParams: {
                tab: undefined,
              },
              queryParamsHandling: 'merge',
            }
          );
        }
      }
    });

    viewer.setControlsEnabled(false);

    this.naViewer = new naViewer({
      viewer,
      window,
      total: this.manifest.totalPages,
      items: this.transcriptions,
      onChangeIndex: (index: number) => this.handleChangePage(index),
      getScanUrl: (id: string) => {
        const baseUrl = `/document/${this.manifest.archiveName}/${this.manifest.accessId}/${this.manifest.inventoryId}/${id}`;

        return baseUrl + `?query=${this.query}`;
      },
    });

    setTimeout(() => {
      this.onLoadPageIndex(this.getInitialPage());
    }, 100);
  }

  /**
   * Find out at what scan to start
   * @returns The index of the scan in context of the entire inventory.
   */
  private getInitialPage(): number {
    if (this.index && this.naViewer) {
      return this.index - 1;
    }

    if (this.manifest.resultIds) {
      return this.manifest.items.indexOf(this.manifest.resultIds[0]);
    }

    return 0;
  }

  /**
   * Calculates whether to load previous batch of scans
   */
  private shouldLoadPreviousPage(index: number): boolean {
    if (!this.naViewer || !this.offsetStart) {
      return false;
    }

    return index === 0;
  }

  /**
   * Calculates whether to load next batch of scans
   */
  private shouldLoadNextPage(index: number): boolean {
    if (!this.naViewer) {
      return false;
    }

    if (this.manifest.totalPages <= this.limit) {
      return false;
    }

    const isEndOfCurrentBatch =
      index - (this.offsetStart || this.offset) ===
      this.naViewer.viewerItems.length;

    const isNotEndOfTotalPages =
      this.offset + this.naViewer.viewerItems.length <
      this.manifest.totalPages + this.limit;

    return isEndOfCurrentBatch && isNotEndOfTotalPages;
  }

  /**
   * A callback for when a user navigates to a specific scan
   * @param index The index of the scan in the current batch
   * @returns
   */
  async handleChangePage(index: number): Promise<void> {
    if (!this.naViewer) {
      return;
    }

    // NOTE: find index of scan in document
    const pageIndex = (this.offsetStart || 0) + index + 1;

    this.hasNextResult$.next(!!this.getNextResult(pageIndex));
    this.hasPreviousResult$.next(!!this.getPreviousResult(pageIndex));
    this.pageIndex.setValue(pageIndex);

    if (this.shouldLoadPreviousPage(index) && this.offsetStart) {
      this.loading$.next(true);
      this.offsetStart =
        this.offsetStart - this.limit < 0 ? 0 : this.offsetStart - this.limit;

      const transcriptions: ITranscription[] = await this.transcriptionService
        .getDocument(
          {
            id: this.documentId,
            limit: this.limit,
            offset: this.offsetStart,
            query: this.isShowResults ? this.query : undefined,
          },
          true
        )
        .pipe(
          map((response) => response.transcriptions),
          tap(() => this.loading$.next(false)),
          catchError(() => {
            this.loading$.next(false);
            return throwError('Er ging iets fout');
          })
        )
        .toPromise();

      await this.naViewer.load({
        items: transcriptions,
        prepend: true,
        activeIndex: this.limit,
        immediately: true,
      });
    }

    if (this.shouldLoadNextPage(pageIndex)) {
      this.loading$.next(true);

      const transcriptions: ITranscription[] = await this.transcriptionService
        .getDocument(
          {
            id: this.documentId,
            limit: this.limit,
            offset:
              (this.offsetStart || this.offset) +
              this.naViewer.viewerItems.length,
            query: this.isShowResults ? this.query : undefined,
          },
          true
        )
        .pipe(
          map((response) => response.transcriptions),
          tap(() => this.loading$.next(false)),
          catchError(() => {
            this.loading$.next(false);
            return throwError('Er ging iets fout');
          })
        )
        .toPromise();

      this.naViewer.load({
        items: transcriptions,
        offset: this.offset + this.naViewer.viewerItems.length,
      });
    }
  }

  zoomFit(): void {
    if (!this.naViewer) {
      return;
    }

    const index = this.pageIndex.value - 1 - (this.offsetStart || this.offset);

    this.naViewer.goToIndex(index);
  }

  previous(): void {
    if (!this.naViewer) {
      return;
    }

    this.naViewer.previous();
  }

  next(): void {
    if (!this.naViewer) {
      return;
    }

    this.naViewer.next();
  }

  getNextResult(currentIndex: number): number | undefined {
    if (!this.manifest.resultIds) {
      return undefined;
    }

    const nextResults = this.idIndexMap(this.manifest.resultIds).filter(
      (index) => index > currentIndex
    );

    return nextResults.length > 0 ? nextResults[0] : undefined;
  }

  getPreviousResult(currentIndex: number): number | undefined {
    if (!this.manifest.resultIds) {
      return undefined;
    }

    const previousResults = this.idIndexMap(this.manifest.resultIds).filter(
      (index) => index < currentIndex - 1
    );

    return previousResults.length > 0
      ? previousResults[previousResults.length - 1]
      : undefined;
  }

  nextResult(): void {
    if (!this.naViewer) {
      return;
    }

    const index = this.getNextResult(this.pageIndex.value - 1);

    if (index) {
      this.onLoadPageIndex(index);
    }
  }

  idIndexMap(ids: string[]): number[] {
    return ids.map((id) => this.manifest.items.indexOf(id));
  }

  previousResult(): void {
    if (!this.naViewer) {
      return;
    }

    const index = this.getPreviousResult(this.pageIndex.value - 1);

    if (index !== undefined) {
      this.onLoadPageIndex(index);
    }
  }

  async onSubmitChangePage(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.pageIndex.value) {
      return;
    }

    const pageIndex = Number(this.pageIndex.value - 1);

    this.onLoadPageIndex(pageIndex);
  }

  /**
   * Use this method to programmatically navigate to the specific page
   * @param pageIndex index in context of the entire inventory
   * @returns void
   */
  async onLoadPageIndex(pageIndex: number): Promise<void> {
    if (!this.naViewer) {
      return;
    }

    if (pageIndex < 0 || pageIndex > this.manifest.totalPages) {
      return;
    }

    // If index has already been loaded, go there
    const offset =
      this.offsetStart === undefined ? this.offset : this.offsetStart;

    const isIndexInView =
      pageIndex >= offset &&
      pageIndex < offset + this.naViewer.viewerItems.length;

    if (isIndexInView) {
      this.naViewer.goToIndex(pageIndex - offset);
      return;
    }

    this.loading$.next(true);
    this.offset = pageIndex;
    this.offsetStart = pageIndex;
    this.pageIndex.setValue(pageIndex + 1);
    this.naViewer.reset();

    const transcriptions: ITranscription[] = await this.transcriptionService
      .getDocument(
        {
          id: this.documentId,
          limit: this.limit,
          offset: this.offset,
          query: this.isShowResults ? this.query : undefined,
        },
        true
      )
      .pipe(
        map((response) => response.transcriptions),
        catchError(() => throwError('Er ging iets fout'))
      )
      .toPromise();

    this.naViewer.load({
      items: transcriptions,
      activeIndex: 0,
      refreshOverlays: true,
      immediately: true,
    });

    this.loading$.next(false);
  }
}
