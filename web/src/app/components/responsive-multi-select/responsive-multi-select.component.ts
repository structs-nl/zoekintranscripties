import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

interface Pair {
  key: string;
  value: string;
}

enum ViewNamesMap {
  scan = 'Scan',
  original = 'Transcriptie',
  modern = 'Verrijkte transcriptie',
}

@Component({
  selector: 'app-responsive-multi-select',
  templateUrl: './responsive-multi-select.component.html',
  styleUrls: ['./responsive-multi-select.component.css'],
})
export class ResponsiveMultiSelectComponent implements OnInit {
  isMobile = false;
  selectMobile: FormControl;
  viewNamesMap = ViewNamesMap;

  @Input() options: Pair[] = [];
  @Input() activeOptions: string[] = [];
  @Output() changeOptions: EventEmitter<string[]> = new EventEmitter<string[]>(
    true
  );

  constructor() {
    this.selectMobile = new FormControl('original');
  }

  ngOnInit(): void {
    if (window) {
      this.isMobile = this.mobileTest(window.innerWidth);
      this.selectMobile.valueChanges.subscribe((value) => {
        this.changeOptions.emit([value]);
      });
    }
  }

  ngAfterContentInit(): void {
    if (this.isMobile) {
      this.changeOptions.emit([this.selectMobile.value]);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.isMobile = this.mobileTest(target.innerWidth);

    if (this.isMobile) {
      this.changeOptions.emit([this.selectMobile.value]);
    }
  }

  private mobileTest(width: number): boolean {
    return width <= 599;
  }

  onToggleView(option: Pair): void {
    if (this.activeOptions.includes(option.value)) {
      if (this.activeOptions.length === 1) {
        return;
      }

      this.changeOptions.emit(
        this.activeOptions.filter((v: string) => v !== option.value)
      );
    } else {
      this.changeOptions.emit([...this.activeOptions, option.value]);
    }
  }
}
