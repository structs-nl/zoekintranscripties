import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranscriptionService } from 'src/app/services/transcription.service';
import { TranscriptionServiceStub } from 'src/app/testing';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      providers: [
        {
          provide: TranscriptionService,
          useValue: new TranscriptionServiceStub(),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
