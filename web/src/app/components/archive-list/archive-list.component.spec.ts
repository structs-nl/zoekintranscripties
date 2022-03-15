import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveListComponent } from './archive-list.component';

describe('ArchiveListComponent', () => {
  let component: ArchiveListComponent;
  let fixture: ComponentFixture<ArchiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
