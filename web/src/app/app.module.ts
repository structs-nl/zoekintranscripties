import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { TreeModule } from '@circlon/angular-tree-component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranscriptionService } from './services/transcription.service';
import { JsonParserService } from './services/json-parser.service';
import { SearchParamsService } from './services/search-params.service';
import { UriCachingInterceptor } from './services/uri-caching.interceptor';
import { SearchComponent } from './views/search/search.component';
import { DocumentComponent } from './views/document/document.component';
import { ScanComponent } from './views/scan/scan.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { AboutComponent } from './views/about/about.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CollectionViewerComponent } from './components/collection-viewer/collection-viewer.component';
import { ListComponent } from './components/list/list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { TextRegionsComponent } from './components/text-regions/text-regions.component';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { IncludesManyPipe } from './pipes/includes-many.pipe';
import { IncludesPipe } from './pipes/includes.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { IncludesTokenPipe } from './pipes/includes-token.pipe';
import { DeepEqualPipe } from './pipes/deep-equal.pipe';
import { CalculateHeightPipe } from './pipes/calculate-height.pipe';
import { RicoPipe } from './pipes/rico.pipe';
import { TreePipe } from './pipes/tree.pipe';
import { EntityUrlPipe } from './pipes/entity-url.pipe';
import { CollapseComponent } from './components/collapse/collapse.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { QueryExpansionsComponent } from './components/query-expansions/query-expansions.component';
import { HierarchyNodeComponent } from './components/hierarchy-node/hierarchy-node.component';
import { ArchiveListComponent } from './components/archive-list/archive-list.component';
import { SearchResultPlaceholderComponent } from './components/placeholders/search-result-placeholder/search-result-placeholder.component';
import { DetailPlaceholderComponent } from './components/placeholders/detail-placeholder/detail-placeholder.component';
import { environment } from '../environments/environment';
import { PanesComponent } from './components/panes/panes.component';
import { DocumentPlaceholderComponent } from './components/placeholders/document-placeholder/document-placeholder.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ResponsiveMultiSelectComponent } from './components/responsive-multi-select/responsive-multi-select.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { SearchHelpContentComponent } from './components/search-help-content/search-help-content.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTooltipModule } from '@angular/material/tooltip';

const customDefaultOptions = {
  scrollThrottlingTime: 0,
  scrollDebounceTime: 0,
  scrollAnimationTime: 750,
  checkResizeInterval: 1000,
  resizeBypassRefreshThreshold: 5,
  modifyOverflowStyleOfParentScroll: true,
  stripedTable: false,
};
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AboutComponent,
    DocumentComponent,
    ScanComponent,
    SearchResultComponent,
    CollectionViewerComponent,
    ListComponent,
    NavBarComponent,
    SvgIconComponent,
    DocumentViewerComponent,
    IncludesManyPipe,
    SearchHelpContentComponent,
    IncludesPipe,
    RicoPipe,
    DeepEqualPipe,
    EntityUrlPipe,
    HighlightPipe,
    TreePipe,
    IncludesTokenPipe,
    CalculateHeightPipe,
    HierarchyNodeComponent,
    TextRegionsComponent,
    CollapseComponent,
    CheckboxComponent,
    ArchiveListComponent,
    SearchResultPlaceholderComponent,
    QueryExpansionsComponent,
    DetailPlaceholderComponent,
    RangeSliderComponent,
    InventoryComponent,
    PanesComponent,
    DocumentPlaceholderComponent,
    SearchBoxComponent,
    ResponsiveMultiSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    VirtualScrollerModule,
    // NOTE: uncomment the following line when you would like to debug akita state management
    // Somehow this line crashes the production build and the suggested fixes in the ticket are insufficient
    // Ticket: https://github.com/datorama/akita/issues/380
    AkitaNgDevtools.forRoot(),
    MatDialogModule,
    NoopAnimationsModule,
    OverlayModule,
    MatTooltipModule,
  ],
  providers: [
    RicoPipe,
    {
      provide: 'apiBaseUrl',
      useValue: environment.apiBaseUrl,
    },
    TranscriptionService,
    JsonParserService,
    SearchParamsService,
    {
      provide: 'virtual-scroller-default-options',
      useValue: customDefaultOptions,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UriCachingInterceptor,
      multi: true,
    },
  ],
  entryComponents: [SearchComponent, SearchHelpContentComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
