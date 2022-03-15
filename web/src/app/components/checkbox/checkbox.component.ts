import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @ViewChild('checkbox') checkbox?: ElementRef;
  @Input() name?: string | number;
  @Input() checked = false;
  @Input() partiallySelected = false;
  @Input() label?: string | number;
  @Input() count?: number;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();

  onChange(event: Event): void {
    event.preventDefault();
    this.change.emit(event);
  }
}
