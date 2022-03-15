import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranscriptionService } from 'src/app/services/transcription.service';
import {
  TranscriptionServiceStub,
  queryByTestId,
  ActivatedRouteStub,
} from '../../testing';
import { CollectionViewerComponent } from './collection-viewer.component';

describe('CollectionViewerComponent', () => {
  let component: CollectionViewerComponent;
  let fixture: ComponentFixture<CollectionViewerComponent>;

  const mockRouter = {
    navigate: (): void => {
      console.log('hoi');
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionViewerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub({
            params: {
              documentId: '23',
            },
            queryParams: {
              query: 'test',
            },
          }),
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: TranscriptionService,
          useValue: new TranscriptionServiceStub(),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionViewerComponent);
    component = fixture.componentInstance;
    component.transcriptions = [
      {
        id: 'joe',
        tokens: [],
        pagenr: 1,
        image: '',
        image_width: 400,
        image_height: 800,
      },
    ];
    fixture.detectChanges();
  });

  it('should create elements', () => {
    expect(component).toBeTruthy();
    expect(queryByTestId(fixture, 'viewer-zoom-in')).toBeTruthy();
    expect(queryByTestId(fixture, 'viewer-zoom-out')).toBeTruthy();
    expect(queryByTestId(fixture, 'viewer-previous')).toBeTruthy();
    expect(queryByTestId(fixture, 'viewer-next')).toBeTruthy();
    expect(queryByTestId(fixture, 'viewer-page-input')).toBeTruthy();
    expect(queryByTestId(fixture, 'viewer-page-button')).toBeTruthy();
    expect(queryByTestId(fixture, 'viewer-total')).toBeTruthy();
    expect(queryByTestId(fixture, 'viewer-collection-viewer')).toBeTruthy();

    fixture.whenStable().then(() => {
      // expect(queryAllByTestId(fixture, 'viewer-overlay').length).toEqual(1);
    });
  });

  it('should handle previous', () => {
    const spy = spyOn(component, 'previous');
    const previousButton = queryByTestId(fixture, 'viewer-previous');
    previousButton.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle next', () => {
    const spy = spyOn(component, 'next');
    const nextButton = queryByTestId(fixture, 'viewer-next');
    nextButton.click();
    expect(spy).toHaveBeenCalled();
  });
});
