import { Observable, of } from 'rxjs';
import {
  ICompletion,
  IInventory,
  ISearchResults,
  ITranscription,
} from '../services/transcription.service';

export class TranscriptionServiceStub {
  getTranscription(): Observable<ITranscription> {
    return of({
      id: '123',
      date: ['01-01-1876'],
      description: 'test test',
      handle: 'test',
      title: 'Test titel',
      image_height: 234,
      image_width: 234543,
      image: '',
      thumbnail: '',
      pagenr: 1,
      tokens: [],
    });
  }

  autoSuggest(term: string): Observable<ICompletion[]> {
    return of([]);
  }

  archives(): Observable<string[]> {
    return of([]);
  }

  inventories(): Observable<string[]> {
    return of([]);
  }

  getDocument(): Observable<IInventory> {
    return of();
  }

  search(): Observable<ISearchResults> {
    return of();
  }
}
