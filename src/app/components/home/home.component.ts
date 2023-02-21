import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cats: any = [];
  ads: any = [];
  constructor(private homeService: HomeService, private ps: PublicService) {}
  ngOnInit(): void {
    this.ps.Allads.subscribe((ads) => {
      this.ads = ads;
      this.test();
    });
  }

  test() {
    for (let ad of this.ads) {
      console.log(ad.description);
      // if (ad.categorie == 'INSTRUMENTS DE MUSIQUE') console.log(ad.description[0].instrument ? ad.description[0].instrument : 't');
    }
  }
}
