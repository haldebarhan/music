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
  filtredAds: any = [];
  ads: any = [];
  constructor(private homeService: HomeService, private ps: PublicService) {}
  ngOnInit(): void {
    this.ps.Allads.subscribe((ads) => {
      this.ads = ads;
      this.filtredAds = ads;
      this.filterAdsByCategory()
    });
  }

  filterAdsByCategory(name: string = "INSTRUMENTS DE MUSIQUE"): Array<any> {
    this.filtredAds = this.ads.filter((ad: any) => ad.categorie == name);
    return this.filtredAds
  }
}
