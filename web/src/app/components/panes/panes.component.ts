import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import {
  IInventory,
  ITranscription,
} from 'src/app/services/transcription.service';
import { DocumentQuery } from 'src/app/state/document.query';

@Component({
  selector: 'app-panes',
  templateUrl: './panes.component.html',
  styleUrls: ['./panes.component.css'],
})
export class PanesComponent {
  inventory$: Observable<IInventory | undefined>;
  pane$: Observable<string>;
  transcription$: Observable<ITranscription | undefined>;
  source$: Observable<string | undefined>;
  @ViewChild('panes') panes?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentQuery: DocumentQuery
  ) {
    this.inventory$ = this.documentQuery
      .getDocument()
      .pipe(filter((inventory) => inventory !== undefined));

    this.transcription$ = this.documentQuery.getTranscription();
    this.pane$ = this.route.queryParamMap.pipe(
      distinctUntilChanged(),
      map((params) => params.get('tab') as string)
    );

    this.source$ = this.transcription$.pipe(
      map((transcription) => {
        const validSourceValues = ['OCR', 'HTR', 'Handmatig'];
        const source = transcription?.source;

        if (!source) {
          return undefined;
        }

        if (
          validSourceValues.some((value) =>
            source.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          )
        ) {
          return source;
        }

        return undefined;
      })
    );
  }

  updateQueryParams(params: Record<string, unknown>): void {
    this.router.navigate([], {
      queryParams: params,
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
