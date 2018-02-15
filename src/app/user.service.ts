import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

@Injectable()
export class UserService {

  private userUrl = "http://localhost:8081/api/login";

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }

}
