import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { artiste } from 'src/helpers/artiste.model';
import { login } from 'src/helpers/login.model';
import { SimpleUser } from 'src/helpers/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  API_URL = 'http://localhost:3001';

  loggedIn = new BehaviorSubject<boolean>(false);
  CredentialError = new BehaviorSubject<string>('');
  user = new BehaviorSubject<any>([]);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get AuthError(): Observable<string> {
    return this.CredentialError.asObservable();
  }

  get userData(): Observable<any> {
    return this.user.asObservable();
  }
  logOut() {
    this.loggedIn.next(false);
    this.user.next([]);
  }

  public(user: SimpleUser) {
    return this.http.post(`${this.API_URL}/authentication/signup`, user);
  }
  professionnal(user: artiste) {
    return this.http.post(`${this.API_URL}/authentication/signup/pro`, user, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
  signIn(user: login) {
    return this.http.post(`${this.API_URL}/authentication/signin`, user);
  }
}
