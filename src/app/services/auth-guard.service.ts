import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  isLooged:boolean = false
  constructor(private router: Router, private authService: AuthService){
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     this.authService.isLoggedIn.subscribe((loggedIn)=> this.isLooged = loggedIn)
     if(this.isLooged){
      return true
     }
     return this.router.parseUrl('/login')
  }
}
