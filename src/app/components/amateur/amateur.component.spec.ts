import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmateurComponent } from './amateur.component';

describe('AmateurComponent', () => {
  let component: AmateurComponent;
  let fixture: ComponentFixture<AmateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
