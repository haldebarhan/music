import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { artiste } from 'src/helpers/artiste.model';
import { login } from 'src/helpers/login.model';
import { SimpleUser } from 'src/helpers/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  API_URL = "http://localhost:3001"
  isAuth = false
  userType:string = 'Grand Public'

  proSignUp(user: artiste) {
    return this.http.post(`${this.API_URL}/authentication/signup/pro`, user, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
  }

  publicSignUp(user: SimpleUser) {
    return this.http.post(`${this.API_URL}/authentication/signup`, user)
  }

  login(user: login) {
    return this.http.post(`${this.API_URL}/authentication/signin`, user)
  }
}
