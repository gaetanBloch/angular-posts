import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { URL_PREFIX } from '../utils';
import { User } from './user.model';
import { AuthData } from './auth-data.model';

const AUTH_DATA = 'posts-auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false;
  private token: string;
  private userId: string;
  private tokenTimeout: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken = (): string => {
    return this.token;
  };

  createUser = (email: string, name: string, password: string): void => {
    const user: User = { email, name, password };
    this.http.put(URL_PREFIX + 'auth/signup', user)
      .subscribe(response => {
        console.log(response);
      });
  };

  login = (email: string, password: string): void => {
    const user: User = { email, password };
    this.http.post<{ token: string, userId: string, expiresIn: number }>
    (URL_PREFIX + 'auth/login', user)
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {

          // Auto Logout after timeout expires
          const expiresIn = +response.expiresIn;
          this.setAuthTimeout(expiresIn);

          this.userId = response.userId;
          this.authStatusListener.next(true);
          this.isAuth = true;

          // Save Auth Data to localStorage
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthData(expirationDate);

          this.router.navigate(['/']);
        }
      });
  };

  autoLogin = () => {
    const authData = this.getAuthData();

    if (authData) {
      const now = new Date();
      const expirationDate = new Date(authData.expiration);
      const expiresIn = expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        // We can Login
        this.token = authData.token;
        this.userId = authData.userId;
        this.authStatusListener.next(true);
        this.isAuth = true;

        // Auto Logout after timeout expires
        this.setAuthTimeout(expiresIn / 1000);
      }
    }
  };

  logout = (): void => {
    this.token = null;
    this.userId = null;
    this.authStatusListener.next(false);
    this.isAuth = false;
    this.router.navigate(['/']);

    // Clear Auth Data from localStorage
    this.clearAuthData();

    clearTimeout(this.tokenTimeout);
  };

  getAuthStatusListener = (): Observable<boolean> => {
    return this.authStatusListener.asObservable();
  };

  isAuthenticated = (): boolean => {
    return this.isAuth;
  };

  private setAuthTimeout = (duration: number) => {
    console.log(`The token will expire in ${duration} seconds`);
    this.tokenTimeout = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData = (expirationDate: Date) => {
    localStorage.setItem(AUTH_DATA, JSON.stringify({
      token: this.token,
      userId: this.userId,
      expiration: expirationDate.toISOString()
    }));
  };

  private clearAuthData = () => {
    localStorage.removeItem(AUTH_DATA);
  };

  private getAuthData = (): AuthData => {
    const authDataStored = localStorage.getItem(AUTH_DATA);
    if (authDataStored) {
      return JSON.parse(authDataStored);
    }
    return null;
  };
}
