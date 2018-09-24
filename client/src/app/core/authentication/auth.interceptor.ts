import { Injectable, Inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          // do error handling here
          this.handleError(err);
        }
      }));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    console.log(err);
    if (err.status === 401 || err.status === 403) {

      this.authenticationService.logout(); //this will probably fail, but clears the cache
      this.router.navigate(['/login'], { replaceUrl: true });

      return of(err.message);
    }
    // handle your auth error or rethrow
    return Observable.throw(err);
  }
}
