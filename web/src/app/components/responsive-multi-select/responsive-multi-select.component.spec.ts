import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveMultiSelectComponent } from './responsive-multi-select.component';

describe('ResponsiveMultiSelectComponent', () => {
  let component: ResponsiveMultiSelectComponent;
  let fixture: ComponentFixture<ResponsiveMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsiveMultiSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
