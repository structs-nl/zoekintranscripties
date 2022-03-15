import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityType } from 'src/app/services/json-parser.service';
import { IToken, IRegion } from 'src/app/services/transcription.service';

const typeMap: Record<EntityType, string> = {
  location: 'locatie',
  person: 'naam',
  time: 'tijdseenheid',
};
@Component({
  selector: 'app-text-regions',
  templateUrl: './text-regions.component.html',
  styleUrls: ['./text-regions.component.css'],
})
export class TextRegionsComponent {
  typeMap = typeMap;

  @Input() regions: IRegion[] = [];
  @Input() queryTokens: IToken[] = [];
  @Input() activeRegion?: IRegion;
  @Input() activeToken?: IToken;
  @Input() modernized = false;

  @Output() changeActiveToken: EventEmitter<
    IToken | undefined
  > = new EventEmitter<IToken | undefined>();

  @Output() changeActiveRegion: EventEmitter<
    IRegion | undefined
  > = new EventEmitter<IRegion | undefined>();

  public changeRegion(region: IRegion): void {
    if (this.regions.length === 1) {
      return;
    }

    this.changeActiveRegion.emit(region);
  }
}
