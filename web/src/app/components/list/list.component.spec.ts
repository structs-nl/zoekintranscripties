import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { TranscriptionService } from 'src/app/services/transcription.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    const transcriptionServiceSpy = jasmine.createSpyObj(
      'TranscriptionService',
      ['search', 'getTranscription']
    );

    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [VirtualScrollerModule],
      providers: [
        { provide: TranscriptionService, useValue: transcriptionServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
