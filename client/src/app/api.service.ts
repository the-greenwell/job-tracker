import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Job } from './job';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  REST_API: string = 'http://localhost:9000/jobs';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  AddJob(data: Job): Observable<any> {
    let API_URL = `${this.REST_API}/`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all objects
  GetJobs() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single object
  GetJob(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  updateJob(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteJob(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
