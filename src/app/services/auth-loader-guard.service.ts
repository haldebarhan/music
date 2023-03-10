import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoaderGuardService implements CanLoad{
  isLooged:boolean = false

  constructor(private router: Router, private authService: AuthService) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     this.authService.isLoggedIn.subscribe((loggedIn)=> this.isLooged = loggedIn)
     if(this.isLooged){
      return true
     }
     return this.router.parseUrl('/login')
  }
}
