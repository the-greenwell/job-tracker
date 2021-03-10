import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Job } from './job';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  USER_API: string = 'user/';
  JOB_API: string = 'jobs/';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, public router: Router) { }

  // Register User
  RegisterUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.USER_API}/register`, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Log user in
  LoginUser(user: User) {
    return this.httpClient.post(`${this.USER_API}/login`, user)
      .subscribe((res:any) => {
        localStorage.setItem('auth_token', res.auth_token);
        localStorage.setItem('userId', res.userId);
        this.router.navigate(['jobs'])
      })
  }

  // Get JWT token
  getAccessToken(){
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('auth_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('auth_token') == null) {
      this.router.navigate(['login']);
    }
  }

  // Add job
  AddJob(user_id:any,data: Job): Observable<any> {
    let API_URL = `${this.JOB_API}/${user_id}`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all jobs
  GetJobs(user_id:any): Observable<any>{
    return this.httpClient.get(`${this.JOB_API}/${user_id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get single job
  GetJob(user_id:any, job_id:any): Observable<any> {
    let API_URL = `${this.JOB_API}/${user_id}/${job_id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update job
  updateJob(user_id:any, job_id:any, data:any): Observable<any> {
    let API_URL = `${this.JOB_API}/${user_id}/${job_id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete job
  deleteJob(user_id:any, job_id:any): Observable<any> {
    let API_URL = `${this.JOB_API}/${user_id}/${job_id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }

  // Error handler
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
