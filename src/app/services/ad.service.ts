import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  constructor(private homeService: HomeService) {}
  Ad = new BehaviorSubject<any>({});

  get singleAd(): Observable<any> {
    return this.Ad.asObservable();
  }

  getSingleAd(id: string) {
    this.homeService.getOneAd(id).subscribe({
      next: (value) => {
        console.log(value)
        this.Ad.next(value)},
      error: (err) => console.log(err),
    });
  }
}
