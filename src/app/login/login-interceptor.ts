import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

const localToken: string = 'x-auth-token';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem(localToken);
    if (token) {
      req = req.clone({
        headers: req.headers.set(localToken, token)
      });
    } else if (!req.url.endsWith('/api/register')) {
      this.router.navigateByUrl('/api/login');
    }
    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            if (event.url.endsWith('/api/login')) {
              let token = event.headers.get(localToken);
              if (token) {
                localStorage.setItem(localToken, token);
              }
            }
          }
        }
      },
      error => {
        if (error.status === 401) {
          this.router.navigateByUrl('/api/login');
        }
      }
    );
  }
}
