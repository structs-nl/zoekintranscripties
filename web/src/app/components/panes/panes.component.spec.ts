import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

import { PanesComponent } from './panes.component';

describe('PanesComponent', () => {
  let component: PanesComponent;
  let fixture: ComponentFixture<PanesComponent>;
  const mockActivatedRoute = {
    snapshot: {
      queryParams: {
        query: undefined,
        sort: 'date-desc',
      },
    },
    queryParamMap: of(
      convertToParamMap({
        archief: ['archive1', 'archive2'],
        inventaris: ['invent1', 'invent2'],
        sort: 'date-desc',
        van: '1540',
        tot: '1900',
      })
    ),
    queryParams: of(
      convertToParamMap({
        query: 'test',
      })
    ),
  };
  const mockRouter = {
    navigate: (): void => {
      console.log('hoi');
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanesComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
