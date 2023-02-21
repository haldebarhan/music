import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingStudioCardComponent } from './recording-studio-card.component';

describe('RecordingStudioCardComponent', () => {
  let component: RecordingStudioCardComponent;
  let fixture: ComponentFixture<RecordingStudioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RecordingStudioCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordingStudioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
