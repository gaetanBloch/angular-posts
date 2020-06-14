import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_PREFIX } from '../utils';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  createUser = (email: string, name: string, password: string): void => {
    const user: User = { email, name, password };
    this.http.post(URL_PREFIX + '/auth/signup', user)
      .subscribe(response => {
        console.log(response);
      });
  };
}
