import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AdService } from 'src/app/services/ad.service';
import { HomeService } from 'src/app/services/home.service';
import * as timeago from 'timeago.js';
declare var jQuery: any;
declare var lightbox: any;
type AdCat = { cle: string; valeur: string };
@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css'],
})
export class AdDetailComponent implements OnInit, OnDestroy {
  ad: any = [];
  adDescription: any = {};
  files: string[] = [];
  slideIndex: number = 0;
  images: string[] = [];
  description: AdCat[] = [];
  counterSubscription: Subscription = new Subscription();
  constructor(
    private adService: AdService,
    private route: ActivatedRoute,
    private hs: HomeService
  ) {}
  ngOnInit(): void {
    this.getOne();
    jQuery(document).ready(() =>
      lightbox.option({
        resizeDuration: 200,
        wrapAround: true,
      })
    );
  }
  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }
  getRouteId(): string {
    const routeParams = this.route.snapshot.paramMap;
    const routeId = <string>routeParams.get('adId');
    return routeId;
  }
  renderTime(datetime: string) {
    return timeago.format(datetime, 'fr_FR');
  }

  getOne() {
    this.hs.getOneAd(this.getRouteId()).subscribe({
      next: (value) => {
        this.ad = value;
        this.adDescription = this.ad.description[0];
        this.files = this.ad.fichier;
        this.imageLink();
        this.filterByKey();
      },
      error: (err) => console.log(err),
    });
  }

  private imageLink(): void {
    for (let img of this.files) {
      const link = `http://localhost:3001/images/${img}`;
      this.images.push(link);
    }
  }

  private filterByKey() {
    Object.keys(this.adDescription).forEach((key) => {
      if (key !== 'description' && key !== 'type') {
        this.description.push({ cle: key, valeur: this.adDescription[key] });
      }
    });
  }
}
