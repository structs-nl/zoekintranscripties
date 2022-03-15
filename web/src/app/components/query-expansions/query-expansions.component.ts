import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IExpansion } from 'src/app/services/transcription.service';

@Component({
  selector: 'app-query-expansions',
  templateUrl: './query-expansions.component.html',
  styleUrls: ['./query-expansions.component.css'],
})
export class QueryExpansionsComponent {
  isOpen = false;
  @Input() selectedExpansions?: Record<string, string[]> = {};
  @Input() expansions: Record<string, IExpansion[]> | undefined = undefined;
  @Output() changeExpansions: EventEmitter<
    Record<string, string[]>
  > = new EventEmitter<Record<string, string[]>>();

  get expansionTerms(): string | undefined {
    return this.expansions && Object.keys(this.expansions).join(', ');
  }

  get noSelectedExpansions(): boolean {
    return this.selectedExpansions
      ? Object.keys(this.selectedExpansions).every(
          (key) => this.selectedExpansions?.[key].length === 0
        )
      : false;
  }

  onToggle(): void {
    this.isOpen = !this.isOpen;
  }

  onSelect(event: Event, term: string): void {
    const target = event.target as HTMLInputElement;
    const termList =
      (this.selectedExpansions && this.selectedExpansions[term]) || [];

    (this.selectedExpansions || {})[term] = target.checked
      ? [...termList, target.name]
      : ((this.selectedExpansions || {})[term] || []).filter(
          (value) => value !== target.name
        );
  }

  onSelectAll(event: Event, term: string, selectedList: string): void {
    const target = event.target as HTMLInputElement;

    if (this.expansions === undefined) {
      return;
    }

    const list = this.expansions[term].find(
      (list) => list.source === selectedList
    );

    if (list === undefined) {
      return;
    }

    this.selectedExpansions = {
      ...this.selectedExpansions,
      [term]: target.checked
        ? [
            ...list.synonym,
            ...(this.selectedExpansions ? this.selectedExpansions[term] : []),
          ]
        : (this.selectedExpansions ? this.selectedExpansions[term] : []).filter(
            (value) => !list.synonym.includes(value)
          ),
    };
  }

  onSubmit(): void {
    this.changeExpansions.emit(this.selectedExpansions);
    this.onToggle();
    window.scroll(0, 0);
  }
}
