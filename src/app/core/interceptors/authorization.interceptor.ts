import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY, Observable, catchError, map, switchMap, throwError } from 'rxjs';

import { AuthorizationService } from '../services/authorization.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthorizationService,
    private _router: Router,
  ) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessTokenPrefix = 'Bearer ';
    const accessTokenPersonal = this._authService.getAccessToken();
    const accessToken = accessTokenPersonal ? (accessTokenPrefix + accessTokenPersonal) : null;

    const cloneReq = accessToken ? req.clone({
      setHeaders: {
        Authorization: accessToken,
      },
    }) : req;

    return next.handle(cloneReq).pipe(
      map((event: HttpEvent<unknown>) => {
        if ((event instanceof HttpResponse) && (event.ok)) {
          this._authService.setLoggedIn();
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return this._handleError(error, req, next);
      }),
    );
  }

  private _handleError(
    error: HttpErrorResponse,
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (error.status === 401 || error.status === 403) {
      return this._authService.getRefreshedAccessToken$().pipe(
        switchMap((newAccessToken: string | null) => {
          const accessTokenPrefix = 'Bearer ';
          const retryReq = newAccessToken ? req.clone({
            setHeaders: {
              Authorization: accessTokenPrefix + newAccessToken,
            },
          }) : null;

          if (!retryReq) {
            this._authService.logOut();
            this._router.navigate(['/authorization']);

            return EMPTY;
          }

          console.log(retryReq);

          return next.handle(retryReq);
        }),
        // take(1),
      );
    }

    return throwError(() => error); 
  }
}
