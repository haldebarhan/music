import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReheasalRoomCardComponent } from './reheasal-room-card.component';

describe('ReheasalRoomCardComponent', () => {
  let component: ReheasalRoomCardComponent;
  let fixture: ComponentFixture<ReheasalRoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReheasalRoomCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReheasalRoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
