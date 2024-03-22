import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserToLogin } from '../models/User';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthentcatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);

  constructor() {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}auth/login`, user)
      .pipe(
        tap((tokens: any) => this.loginUser(user.email, tokens.access_token))
      );
  }

  private loginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthentcatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthentcatedSubject.next(false);
  }

  getProfile() {
    return this.http.get(`${environment.baseUrl}auth/profile`);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }
}
