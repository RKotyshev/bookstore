import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

import { Observable, of, map, shareReplay, BehaviorSubject } from 'rxjs';
import { IJwtTokens, IRequestAuthorization } from '../interfaces/authorization';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private _logged = new BehaviorSubject<boolean>(false);
  private _authorizationUrl = 'api/token';
  // private _redirectUrl = '/authorization';

  constructor(
    private _http: HttpClient,
  ) { }

  public get isLoggedIn$(): Observable<boolean> {
    return this._logged.asObservable()
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
      );
  }

  public logIn(accountData: IRequestAuthorization): void {
    this._http.post<IJwtTokens>(`${this._authorizationUrl}/`, accountData)
      .subscribe({
        next: (response: IJwtTokens) => {
          const accessTokenPrefix = 'Bearer ';
          const accessToken = accessTokenPrefix + response.access;
  
          localStorage.setItem('refreshToken', response.refresh!);
          localStorage.setItem('accessToken', accessToken);
  
          this._logged.next(true);
        },
        error: () => {
          this._logged.next(false);
        },
      });
  }

  public logOut(): void {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');

    this._logged.next(false);
  }

  public getAccessToken(): string | null{
    const accessToken = localStorage.getItem('accessToken');

    return accessToken;
  }

  public setLoggedIn(): void {
    this._logged.next(true);
  }

  public refreshToken(): Observable<string | null> {
    const refreshToken = localStorage.getItem('refreshToken');

    // console.log('test');

    if (!refreshToken) {

      // Router navigate
      return of(null);
    }

    const refreshBody = {
      refresh: refreshToken,
    };

    return this._http.post<IJwtTokens>(`${this._authorizationUrl}/refresh/`, refreshBody).pipe(
      map((response: IJwtTokens) => {
        const accessTokenPrefix = 'Bearer ';
        const accessToken = accessTokenPrefix + response.access!;
        console.log('test');

        localStorage.setItem('accessToken', accessToken);

        return accessToken;
      }),
    );
  }
}
