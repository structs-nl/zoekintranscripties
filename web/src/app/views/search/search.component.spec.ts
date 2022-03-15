import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { TranscriptionService } from 'src/app/services/transcription.service';
import { TranscriptionServiceStub } from '../../testing/transcription-service-stub';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
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
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, NavBarComponent],
      providers: [
        {
          provide: TranscriptionService,
          useValue: new TranscriptionServiceStub(),
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
