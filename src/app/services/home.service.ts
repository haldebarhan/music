import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API_URL = "http://localhost:3001"
  MusicJobs: any = []
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.API_URL)
  }
  getTypes() {
    return this.http.get(`${this.API_URL}/types`)
  }

  getTools() {
    return this.http.get(`${this.API_URL}/tools`)
  }

  createAd(user_id: string, data: any) {
    return this.http.post(`${this.API_URL}/user/${user_id}/create`, data)
  }
}
