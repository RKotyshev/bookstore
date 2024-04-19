import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

import { Observable, map } from 'rxjs';

import { RegistrationService } from '../../services/registration.service';


@Injectable({
  providedIn: 'root',
})
export class AvailableEmailValidator implements AsyncValidator {
  constructor(
    private _registrationService: RegistrationService,
  ) {}

  public validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    return this._registrationService.isAvailableEmail(email).pipe(
      map((isAvailable: boolean) => {
        return !isAvailable ? {
          availableEmail: true,
        } : null;
      }),
    );
  }
}
