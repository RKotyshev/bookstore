import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { IAvailableEmail } from '../interfaces/registration';


@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private _registrationUrl = '/api/users';

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
}
