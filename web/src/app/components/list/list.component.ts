import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ISearchResult } from 'src/app/services/transcription.service';
import { IPageInfo, VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnChanges {
  public isBrowser = false;
  public buffer: ISearchResult[] = [];
  public threshold = 800;

  @ViewChild('scroll', { static: true }) scroll?: VirtualScrollerComponent;
  @Input() items: ISearchResult[] = [];
  @Input() loading = false;
  @Input() error = false;
  @Input() hasActiveFilters = false;
  @Input() query = '';
  @Output() onFetchData: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.buffer = this.items;
  }

  public ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const currentIndex = window.sessionStorage.getItem('searchCurrentIndex');

    // NOTE: maybe invalidate this localstorage setting after a certain amount of time?
    if (currentIndex && this.scroll) {
      this.scroll.scrollToIndex(Number(currentIndex));
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // NOTE: only run when archives has changed
    if (
      changes.items &&
      changes.items.currentValue !== changes.items.previousValue
    ) {
      this.buffer.push(...this.items);
    }
  }

  public reset(): void {
    this.buffer = [];
  }

  public onChange(event: IPageInfo): void {
    if (this.isBrowser) {
      window.sessionStorage.setItem(
        'searchCurrentIndex',
        event.startIndex.toString()
      );
    }
  }

  public fetchMore(event: IPageInfo): void {
    // NOTE: do not load more if is initial screen
    if (!this.loading && !this.error && !this.query && !this.hasActiveFilters) {
      return;
    }

    if (event.scrollEndPosition + this.threshold > event.maxScrollPosition) {
      this.onFetchData.emit();
    }
  }
}
