import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IInventory, ITranscription } from '../services/transcription.service';
import { DocumentState, DocumentStore } from './document.store';

@Injectable({
  providedIn: 'root',
})
export class DocumentQuery extends QueryEntity<DocumentState> {
  constructor(protected store: DocumentStore) {
    super(store);
  }

  getDocument(): Observable<IInventory | undefined> {
    return this.select('document');
  }

  getTranscription(): Observable<ITranscription | undefined> {
    return this.selectActiveId().pipe(
      filter((id) => id !== undefined),
      map(() => this.getActive())
    );
  }

  getLimit(): Observable<number> {
    return this.select((state) => state.limit);
  }

  getOffset(): Observable<number> {
    return this.select((state) => state.offset);
  }

  getTotalPages(): Observable<number> {
    return this.select(
      (state: DocumentState) => state.document?.totalPages || 0
    );
  }

  isLoading(): Observable<boolean> {
    return this.selectLoading();
  }

  getError(): Observable<Error> {
    return this.selectError();
  }

  getScanIds(): Observable<string[] | undefined> {
    return this.select((state: DocumentState) => state.ids);
  }

  getTranscriptions(): Observable<ITranscription[]> {
    return this.selectAll();
  }

  getItems(): string[] {
    return this.getValue().ids || [];
  }
}
