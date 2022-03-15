import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryExpansionsComponent } from './query-expansions.component';

describe('QueryExpansionsComponent', () => {
  let component: QueryExpansionsComponent;
  let fixture: ComponentFixture<QueryExpansionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QueryExpansionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryExpansionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
