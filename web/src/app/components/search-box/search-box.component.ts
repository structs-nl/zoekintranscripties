import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit, OnChanges {
  search: FormControl = new FormControl('');

  @Input() value?: string;
  @Output() changeQuery: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.search.setValue(this.value);
  }

  ngOnChanges(): void {
    if (this.value !== undefined) {
      this.search.setValue(this.value);
    }
  }

  onReset(): void {
    this.search.setValue(undefined);
    this.changeQuery.emit(undefined);
  }

  onSearch(event: Event): void {
    event.preventDefault();

    this.changeQuery.emit(this.search.value);
  }
}
