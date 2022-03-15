import { Injectable } from '@angular/core';
import {
  StoreConfig,
  EntityState,
  EntityStore,
  ActiveState,
} from '@datorama/akita';
import { IInventory, ITranscription } from '../services/transcription.service';

export interface DocumentState
  extends EntityState<ITranscription, string>,
    ActiveState {
  document?: IInventory;
  offset: number;
  limit: number;
}

const initialExtendedState: Partial<DocumentState> = {
  document: undefined,
  offset: 0,
  limit: 10,
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'document' })
export class DocumentStore extends EntityStore<DocumentState> {
  constructor() {
    super(initialExtendedState);
  }
}
