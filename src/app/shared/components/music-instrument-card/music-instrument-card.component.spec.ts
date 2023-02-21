import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicInstrumentCardComponent } from './music-instrument-card.component';

describe('MusicInstrumentCardComponent', () => {
  let component: MusicInstrumentCardComponent;
  let fixture: ComponentFixture<MusicInstrumentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MusicInstrumentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicInstrumentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
