import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranscriptionService } from 'src/app/services/transcription.service';
import { DocumentComponent } from './document.component';
import { TranscriptionServiceStub } from '../../testing/transcription-service-stub';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';

describe('DocumentComponent', () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async(() => {
    const activatedRouteStub = new ActivatedRouteStub({
      params: {
        documentId: '1234',
      },
      queryParams: {
        show: 'results',
      },
    });

    const mockRouter = {
      navigate: (): void => {
        console.log('hoi');
      },
    };

    TestBed.configureTestingModule({
      declarations: [DocumentComponent, NavBarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        {
          provide: TranscriptionService,
          useValue: new TranscriptionServiceStub(),
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
