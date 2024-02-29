import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

import { formatDate } from '../utils/format-date';


@Directive({
  selector: '[appDatesValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DatesValidatorDirective,
    multi: true,
  }],
})
export class DatesValidatorDirective implements Validator {
  constructor() { }

  public static checkDates: ValidatorFn = (control: AbstractControl) => {
    const writingDate = control.get('writing_date')?.value;
    const releaseDate = control.get('release_date')?.value;
    const datesDiff = Date.parse(releaseDate) - Date.parse(writingDate);

    return datesDiff < 0 ? {
      invalidWritingDate: { value: formatDate(writingDate) },
    } : null;
  };

  public validate(control: AbstractControl): ValidationErrors | null {
    return DatesValidatorDirective.checkDates(control);
  }
}
