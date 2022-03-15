import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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

    this.transcription$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('scan') || undefined),
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

    this.updateQueryParams({
      scan: state.document.items[this.page.value - 1],
    });
  }

  updateActiveToken(token?: IToken): void {
    this.activeToken = token;
  }

  updateActiveRegion(region?: IRegion): void {
    this.activeRegion = region;
  }

  updateQueryParams(params: Record<string, unknown>): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
