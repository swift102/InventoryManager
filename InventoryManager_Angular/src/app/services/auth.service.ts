import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5240/api'; 


  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  

  login(emailaddress: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/Authentication/Login`, { emailaddress, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.user);
          this.loggedInSubject.next(true);
        })
      );
  }

    // http://localhost:5240/api/Authentication/Register
    register(emailaddress: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/Authentication/Register`, { emailaddress, password });
    }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }
}