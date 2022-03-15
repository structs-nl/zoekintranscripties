import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IInventory,
  ITranscription,
} from 'src/app/services/transcription.service';
import { DocumentQuery } from 'src/app/state/document.query';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  inventory$: Observable<IInventory | undefined>;
  transcriptions$: Observable<ITranscription[]>;

  constructor(private documentQuery: DocumentQuery) {
    this.inventory$ = this.documentQuery.getDocument();
    this.transcriptions$ = this.documentQuery.getTranscriptions();
  }
}
