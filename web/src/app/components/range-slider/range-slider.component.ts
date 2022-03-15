import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import rangeSlider from 'nouislider';

export type InputRangeValue = [number, number];

export type InputRangeBucket = {
  count: number;
  label: number;
};

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css'],
})
export class RangeSliderComponent implements AfterViewInit, OnChanges {
  rangeSlider?: rangeSlider.noUiSlider;
  isBrowser = false;
  min: number;
  max: number;
  step = 1;
  computedValue: InputRangeValue;

  @ViewChild('slider') slider?: ElementRef;
  @Input() buckets: InputRangeBucket[] = [];
  @Input() value?: InputRangeValue;
  @Input() interval = 0;
  @Output() onChange: EventEmitter<InputRangeValue> = new EventEmitter<
    InputRangeValue
  >();

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.min = this.value ? this.value[0] : 0;
    this.max = this.value ? this.value[1] : new Date().getFullYear();
    this.computedValue = this.value
      ? this.value
      : ([this.min, this.max] as InputRangeValue);
  }

  ngOnChanges(): void {
    if (this.buckets.length > 0) {
      const min = Math.min(...this.buckets.map((b) => b.label));
      const max = Math.max(...this.buckets.map((b) => b.label));

      this.rangeSlider?.updateOptions({
        range: {
          min,
          max,
        },
      });

      if (this.value !== undefined) {
        this.rangeSlider?.set(this.value);
      } else {
        this.rangeSlider?.set([min, max]);
      }
    }
  }

  ngAfterViewInit(): void {
    if (!this.slider || !this.isBrowser) {
      return;
    }

    this.rangeSlider = rangeSlider.create(this.slider.nativeElement, {
      start: this.computedValue,
      connect: true,
      step: this.step,
      format: {
        to: (value: number): number => value,
        from: (value: string): number => Number(value),
      },
      range: {
        min: this.min,
        max: this.max,
      },
    });

    this.rangeSlider.on('set', (value) => {
      this.computedValue = value as InputRangeValue;
    });

    this.rangeSlider.on('change', (value) => {
      this.onChange.emit(value as InputRangeValue);
    });

    // NOTE: a11y fix for handles
    this.slider.nativeElement
      .querySelectorAll('[role=slider]')
      .forEach((handle: HTMLDivElement) => {
        handle.setAttribute('title', 'Schuifregelaar handgreep');
      });
  }

  updateRange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    const [lower, upper] = this.computedValue;

    if (!this.rangeSlider) {
      return;
    }

    if (target.name === 'upper') {
      this.computedValue = [lower, value];
    }

    if (target.name === 'lower') {
      this.computedValue = [value, upper];
    }

    this.rangeSlider.set(this.computedValue);
    this.onChange.emit(this.computedValue);
  }
}
