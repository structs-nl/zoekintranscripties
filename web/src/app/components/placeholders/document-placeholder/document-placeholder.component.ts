import { Component } from '@angular/core';

@Component({
  selector: 'app-document-placeholder',
  styleUrls: ['./document-placeholder.component.css'],
  template: `
    <div>
      <div class="placeholder-nav"></div>
      <div class="placeholder-tools"></div>
      <div class="placeholder-main">
        <div class="placeholder-panes"></div>
        <div class="placeholder-viewer">
          <div class="placeholder-actions"></div>
          <div class="placeholder-scans"></div>
        </div>
      </div>
    </div>
  `,
})
export class DocumentPlaceholderComponent {}
