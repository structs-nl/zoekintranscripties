import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyNodeComponent } from './hierarchy-node.component';

describe('HierarchyNodeComponent', () => {
  let component: HierarchyNodeComponent;
  let fixture: ComponentFixture<HierarchyNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HierarchyNodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
