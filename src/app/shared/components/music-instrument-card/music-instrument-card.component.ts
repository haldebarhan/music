import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-instrument-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-instrument-card.component.html',
  styleUrls: ['./music-instrument-card.component.css'],
})
export class MusicInstrumentCardComponent {
  @Input() item: any;
}
