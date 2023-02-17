import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioEnregistrementComponent } from './studio-enregistrement.component';

describe('StudioEnregistrementComponent', () => {
  let component: StudioEnregistrementComponent;
  let fixture: ComponentFixture<StudioEnregistrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioEnregistrementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioEnregistrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
