import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { URL_PREFIX } from '../utils';
import { User } from './user.model';

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
          console.log(`The token will expire in ${expiresIn} seconds`);
          this.tokenTimeout = setTimeout(() => {
            this.logout();
          }, expiresIn * 1000);

          this.userId = response.userId;
          this.authStatusListener.next(true);
          this.isAuth = true;
          this.router.navigate(['/']);
        }
      });
  };

  logout = (): void => {
    this.token = null;
    this.userId = null;
    this.authStatusListener.next(false);
    this.isAuth = false;
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimeout);
  };

  getAuthStatusListener = (): Observable<boolean> => {
    return this.authStatusListener.asObservable();
  };

  isAuthenticated = (): boolean => {
    return this.isAuth;
  };
}
