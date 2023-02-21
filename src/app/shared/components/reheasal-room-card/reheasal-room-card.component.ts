import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reheasal-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reheasal-room-card.component.html',
  styleUrls: ['./reheasal-room-card.component.css'],
})
export class ReheasalRoomCardComponent {
  @Input() item: any;
}
