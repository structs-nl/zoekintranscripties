import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IncludesPipe } from 'src/app/pipes/includes.pipe';
import { TranscriptionService } from 'src/app/services/transcription.service';
import { DocumentQuery } from 'src/app/state/document.query';
import { ActivatedRouteStub } from 'src/app/testing';
import { TranscriptionServiceStub } from '../../testing/transcription-service-stub';
import { ScanComponent } from './scan.component';

describe('ScanComponent', () => {
  const mockRouter = {
    navigate: (): void => {
      console.log('hoi');
    },
  };
  let component: ScanComponent;
  let fixture: ComponentFixture<ScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScanComponent, IncludesPipe],
      providers: [
        {
          provide: TranscriptionService,
          useValue: new TranscriptionServiceStub(),
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub({
            params: {},
            queryParams: {
              query: 'test',
            },
          }),
        },
        DocumentQuery,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
