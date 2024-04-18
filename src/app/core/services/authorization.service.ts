import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, map, shareReplay, BehaviorSubject, catchError } from 'rxjs';
import { IJwtTokens, IRequestAuthorization } from '../interfaces/authorization';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private _logged = new BehaviorSubject<boolean>(false);
  private _authorizationUrl = 'api/token';

  constructor(
    private _http: HttpClient,
  ) { }

  public get isLoggedIn$(): Observable<boolean> {
    return this._logged.asObservable()
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
      );
  }

  public logIn$(accountData: IRequestAuthorization): Observable<boolean> {
    return this._http.post<IJwtTokens>(`${this._authorizationUrl}/`, accountData)
      .pipe(
        map((response: IJwtTokens) => {
          // const accessTokenPrefix = 'Bearer ';
          // const accessToken = accessTokenPrefix + response.access;

          localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh!);
          localStorage.setItem(ACCESS_TOKEN_KEY, response.access!);

          this._logged.next(true);

          return true;
        }),
        catchError(() => of(false)),
      );
  }

  public logOut(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    this._logged.next(false);
  }

  public getAccessToken(): string | null{
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    return accessToken;
  }

  public setLoggedIn(): void {
    this._logged.next(true);
  }

  public getRefreshedAccessToken$(): Observable<string | null> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      return of(null);
    }

    const refreshBody = {
      refresh: refreshToken,
    };

    return this._http.post<IJwtTokens>(`${this._authorizationUrl}/refresh/`, refreshBody).pipe(
      map((response: IJwtTokens) => {
        const accessToken = response.access!;

        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

        return accessToken;
      }),
      catchError(() => of(null)),
    );
  }
}
