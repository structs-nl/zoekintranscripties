import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentUrlPipe, PageUrlPipe } from 'src/app/pipes/url.pipe';
import { ISearchResult } from 'src/app/services/transcription.service';

import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent, DocumentUrlPipe, PageUrlPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    component.result = {
      title: 'Test',
      id: '234',
      totalPages: 200,
    } as ISearchResult;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
