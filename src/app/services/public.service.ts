import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root',
})
export class PublicService {

  private ads = new BehaviorSubject<any>([]);
  constructor(private hs: HomeService) {
    this.hs.getData().subscribe(res => this.ads.next(res))
  }

  get Allads(): Observable<any> {
    return this.ads.asObservable();
  }
}
