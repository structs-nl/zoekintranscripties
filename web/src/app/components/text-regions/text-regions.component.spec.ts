import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRegionsComponent } from './text-regions.component';

describe('TextRegionsComponent', () => {
  let component: TextRegionsComponent;
  let fixture: ComponentFixture<TextRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
