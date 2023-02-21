import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theater-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theater-card.component.html',
  styleUrls: ['./theater-card.component.css'],
})
export class TheaterCardComponent {
  @Input() item: any;
}
