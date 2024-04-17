import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthorizationService,
  ) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const isLoggedIn = this._authService.isLoggedIn$;

    // if (!isLoggedIn) {
    //   return next.handle(req);
    // }

    // // const accessToken = this._authService
    // // this._authService.getAccessToken().subscribe({
    // //   next: (accessToken: string) => {
    // //     const cloneReq = req.clone({
    // //       setHeaders: {
    // //         Authorization: accessToken,
    // //       },
    // //     });
  
    // //     return next.handle(cloneReq);
    // //   },
    // //   error: () => {
    // //     return next.handle(req);
    // //   },
    // // });

    const accessToken = this._authService.getAccessToken();

    const cloneReq = accessToken ? req.clone({
      setHeaders: {
        Authorization: accessToken,
      },
    }) : req;

    return next.handle(cloneReq);
  }
}
