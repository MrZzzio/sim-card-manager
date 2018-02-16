import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

@Injectable()
export class UserService {

  private loginUrl = "http://localhost:8081/api/login";
  private registerUrl = "http://localhost:8081/api/register";

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }

}
