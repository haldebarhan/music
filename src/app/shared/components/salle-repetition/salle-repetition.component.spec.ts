import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleRepetitionComponent } from './salle-repetition.component';

describe('SalleRepetitionComponent', () => {
  let component: SalleRepetitionComponent;
  let fixture: ComponentFixture<SalleRepetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalleRepetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalleRepetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
