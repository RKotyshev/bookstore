import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

import { Observable, of, map, shareReplay, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private _logged = new BehaviorSubject<boolean>(false);
  private _authorizationUrl = 'api/token';
  // private _accessTokenPrefix = 'Bearer ';
  // private _accessTokenPersonal!: string | null;
  // private _redirectUrl = '/authorization';
  // private _refreshToken!: string | null;

  constructor(
    // private _router: Router,
    private _http: HttpClient,
  ) { }

  public get isLoggedIn$(): Observable<boolean> {
    return this._logged.asObservable()
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
      );
  }

  public login(accountData: { email: string, password: string }): Observable<boolean> {
    // const accessToken = localStorage.getItem('access');

    // if (!accessToken) {
    //   this._router.navigate([this._redirectUrl]);
    // }

    this._http.post<{ refresh: string, access: string }>(`${this._authorizationUrl}/`, accountData)
      .subscribe({
        next: (response: { refresh: string, access: string }) => {
          const accessTokenPrefix = 'Bearer ';
          const accessToken = accessTokenPrefix + response.access;
  
          localStorage.setItem('refreshToken', response.refresh);
          localStorage.setItem('accessToken', accessToken);
  
          this._logged.next(true);
        },
        error: () => {
          this._logged.next(false);
        },
      });

    return this.isLoggedIn$;
  }

  public getAccessToken(): string | null{
    const accessToken = localStorage.getItem('accessToken');

    return accessToken;

    // this._refreshToken = localStorage.getItem('refreshToken');

    // if (!this._refreshToken) {
    //   this._router.navigate([this._redirectUrl]);
    // }

    // const refreshBody = {
    //   refresh: this._refreshToken,
    // };

    // return this._http.post<{ access: string }>(`${this._authorizationUrl}`, refreshBody).pipe(
    //   map((response: { access: string }) => {
    //     return response.access;
    //   }),
    // );
  }

  public refreshToken(): Observable<string> | Observable<null> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return of(null);
    }

    const refreshBody = {
      refresh: refreshToken,
    };

    return this._http.post<{ access: string }>(`${this._authorizationUrl}/`, refreshBody).pipe(
      map((response: { access: string }) => {
        return response.access;
      }),
    );
  }
}
