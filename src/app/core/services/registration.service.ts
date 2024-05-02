import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { IAvailableEmail, IRequestRegistration, IUser } from '../interfaces/registration';
import { BOOKSTORE_API } from '../../../environments/environment';

// export const BOOKSTORE_API = 'https://bookstore-api.wis-software.ru/api';


@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  // private _registrationUrl = '/api/users';
  private _registrationUrl = `${BOOKSTORE_API}/users`;

  constructor(
    private _http: HttpClient,
  ) { }

  public isAvailableEmail(email: string): Observable<boolean> {
    const params = {
      email,
    };

    return this._http.get<IAvailableEmail>(`${this._registrationUrl}/available/`, { params }).pipe(
      map((response: IAvailableEmail) => {
        return response.isAvailable;
      }),
    );
  }

  public registerUser(userData: IRequestRegistration): Observable<IUser> {
    const body = {
      ...userData,
    };

    return this._http.post<IUser>(`${this._registrationUrl}/`, body);
  }
}
