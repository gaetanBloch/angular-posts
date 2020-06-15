import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { URL_PREFIX } from '../utils';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = false;
  private token: string;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {
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
    this.http.post<{ token: string, userId: string }>
    (URL_PREFIX + 'auth/login', user)
      .subscribe(response => {
        this.token = response.token;
        this.userId = response.userId;
        if (this.token) {
          this.authStatusListener.next(true);
          this.isAuth = true;
        }
      });
  };

  getAuthStatusListener = (): Observable<boolean> => {
    return this.authStatusListener.asObservable();
  };

  isAuthenticated = (): boolean => {
    return this.isAuth;
  };
}
