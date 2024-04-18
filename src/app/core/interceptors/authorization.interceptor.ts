import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, switchMap, throwError } from 'rxjs';

import { AuthorizationService } from '../services/authorization.service';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthorizationService,
  ) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this._authService.getAccessToken();

    const cloneReq = accessToken ? req.clone({
      setHeaders: {
        Authorization: accessToken,
      },
    }) : req;

    return next.handle(cloneReq).pipe(
      map((event: HttpEvent<unknown>) => {
        if ((event instanceof HttpResponse) && (event.status === 200) && accessToken) {
          this._authService.setLoggedIn();
        }

        return event;
      }),
      // catchError((err: unknown, caught: Observable<HttpEvent<unknown>>) => {
      //   return of(caught);
      // }),
      catchError((error: HttpErrorResponse) => {
        // console.log('test');
        if (error.status === 401) {
          // console.log('test');
          this._authService.refreshToken().pipe(
            switchMap((newAccessToken: string | null) => {
              console.log('test');

              const retryReq = newAccessToken ? req.clone({
                setHeaders: {
                  Authorization: newAccessToken,
                },
              }) : req;

              console.log(retryReq);

              return next.handle(retryReq);
            }),
          ).subscribe();
        }

        return throwError(error); 
      }),
    );
  }
}
