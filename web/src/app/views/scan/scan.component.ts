import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { DocumentQuery } from 'src/app/state/document.query';
import { DocumentStore } from 'src/app/state/document.store';
import {
  TranscriptionService,
  ITranscription,
  IToken,
  IRegion,
  IInventory,
} from '../../services/transcription.service';

interface Pair {
  key: string;
  value: string;
}

enum Views {
  Scan = 'scan',
  Origineel = 'original',
  Gemoderniseerd = 'modern',
}

export interface Parameters {
  archiveName: string;
  accessId: string;
  inventoryId: string;
  scanId?: string;
}

export const getIdFromParams = (params: Parameters): string => {
  const path = [
    params.archiveName,
    params.accessId,
    params.inventoryId,
    params.scanId,
  ]
    .filter(Boolean)
    .join('/');

  if (params.archiveName === 'NL-HaNA') {
    return `https://archief.nl/doc/transcriptie/${[
      params.accessId,
      params.inventoryId,
      params.scanId,
    ]
      .filter(Boolean)
      .join('/')}`.toLowerCase();
  }

  return `https://archief.nl/doc/transcriptie/${path}`.toLowerCase();
};

export const getParamsFromUrl = (url: string): Parameters => {
  const parts = url.slice(url.lastIndexOf('transcriptie')).split('/').slice(1);

  // TODO: do something proper when id is nationaal archief.
  if (url.includes('1.04.02')) {
    return {
      archiveName: 'NL-HaNA',
      accessId: parts[0],
      inventoryId: parts[1],
      scanId: parts[2] || undefined,
    };
  }

  return {
    archiveName: parts[0],
    accessId: parts[1],
    inventoryId: parts[2],
    scanId: parts[3] || undefined,
  };
};

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnDestroy {
  @ViewChild('content') content?: ElementRef;
  page: FormControl = new FormControl();
  queryParams?: ParamMap;
  isSticky = false;

  destroy$: Subject<boolean> = new Subject<boolean>();
  transcription$: Observable<ITranscription | undefined> = new Observable();
  inventory$: Observable<IInventory | undefined> = new Observable();
  totalPages$: Observable<number> = new Observable();

  activeToken: IToken | undefined;
  activeRegion: IRegion | undefined;

  views: Pair[] = Object.entries(Views).map(([key, value]) => ({ key, value }));
  activeViews$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    Views.Scan,
    Views.Origineel,
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TranscriptionService,
    private documentQuery: DocumentQuery,
    private documentStore: DocumentStore,
    private meta: Meta
  ) {
    this.totalPages$ = this.documentQuery.getTotalPages();
    this.inventory$ = this.documentQuery.getDocument();

    this.transcription$ = this.route.params.pipe(
      map((params: Params) => getIdFromParams(params as Parameters)),
      filter((id) => id !== undefined),
      distinctUntilChanged(),
      switchMap((scanId) => this.service.getTranscription(scanId as string))
    );

    this.transcription$
      .pipe(takeUntil(this.destroy$))
      .subscribe((transcription) => {
        if (transcription) {
          this.meta.updateTag(
            {
              property: 'og:image',
              content: transcription.defaultImage,
            },
            'property="og:image"'
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.documentStore.setActive(null);
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    this.isSticky = window.pageYOffset >= 254;
  }

  onToggleView(activeViews: string[]): void {
    this.activeViews$.next(activeViews);
  }

  onSubmitChangePage(event: Event): void {
    event.preventDefault();

    const state = this.documentQuery.getValue();

    if (!state.document) {
      return;
    }

    const params = getParamsFromUrl(state.document.items[this.page.value - 1]);

    this.router.navigate(
      [
        '/document',
        params.archiveName,
        params.accessId,
        params.inventoryId,
        params.scanId,
      ],
      {
        queryParamsHandling: 'merge',
      }
    );
  }

  updateActiveToken(token?: IToken): void {
    this.activeToken = token;
  }

  updateActiveRegion(region?: IRegion): void {
    this.activeRegion = region;
  }
}
