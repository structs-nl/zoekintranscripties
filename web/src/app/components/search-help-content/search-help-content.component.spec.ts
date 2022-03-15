import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHelpContentComponent } from './search-help-content.component';

describe('SearchHelpContentComponent', () => {
  let component: SearchHelpContentComponent;
  let fixture: ComponentFixture<SearchHelpContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchHelpContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHelpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
