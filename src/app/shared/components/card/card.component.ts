import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import LocaleFunc from 'src/helpers/Locale';
import * as timeago from 'timeago.js';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() item: any;
  MusicToolDesc: any;
  theaterDesc: any;
  reheasalDesc: any;
  recordingDesc: any;
  ngOnInit(): void {
    this.Init();
    this.initTime();
    console.log(this.theaterDesc);
  }

  private Init() {
    switch (this.item.categorie) {
      case 'INSTRUMENTS DE MUSIQUE':
        this.MusicToolDesc = this.item;
        break;
      case 'SALLE DE SPECTACLE':
        this.reheasalDesc = this.item;
        break;
      case 'SALLE DE REPETITION':
        this.theaterDesc = this.item;
        break;
      case "STUDIO D'ENREGISTREMENT":
        this.recordingDesc = this.item;
        break;
      default:
        break;
    }
  }
  private initTime() {
    timeago.register('fr_FR', LocaleFunc);
  }

  renderTime(datetime: string) {
    return timeago.format(datetime, 'fr_FR');
  }

  check(item: Array<string> | string): boolean {
    if (Array.isArray(item)) return true;
    else return false;
  }

  navigate() {
    this.router.navigate(['/publication', this.item.id]);
  }
}
