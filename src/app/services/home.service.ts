import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  API_URL = 'http://localhost:3001';
  MusicJobs: any = [];
  Instrument: any = [];
  musicStyle: any = [];
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(this.API_URL);
  }
  getAllAds() {
    return this.http.get(this.API_URL);
  }
  getOneAd(id: string){
    return this.http.get(`${this.API_URL}/ad/${id}`)
  }
  getTypes() {
    return this.http.get(`${this.API_URL}/types`);
  }

  getTools() {
    return this.http.get(`${this.API_URL}/tools`);
  }

  createAd(user_id: string, data: any) {
    return this.http.post(`${this.API_URL}/user/${user_id}/create`, data);
  }

  getData(): Observable<any> {
    return this.http
      .get<any>(`${this.API_URL}/ads`)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
