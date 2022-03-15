import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISearchResult } from 'src/app/services/transcription.service';

const mapType = {
  original: 'Origineel',
  modern: 'Gemoderniseerd',
  description: 'Beschrijving',
};

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent {
  @Input() result?: ISearchResult;

  public mapType = mapType;

  get descriptionHighlightSize(): number {
    if (!this.result) {
      return 0;
    }

    return this.result.highlights.filter(
      (highlight) => highlight.type === 'description'
    ).length;
  }

  get date(): string | undefined {
    if (!this.result || !this.result.date) {
      return;
    }

    return this.result.date.map((date) => date.slice(0, 4)).join('-');
  }
}
