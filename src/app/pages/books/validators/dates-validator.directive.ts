import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

import moment from 'moment';


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
    const datesDiff = moment(releaseDate).diff(moment(writingDate));

    return datesDiff < 0 ? {
      invalidWritingDate: { value: moment(writingDate).format('YYYY-MM-DD') },
    } : null;
  };

  public validate(control: AbstractControl): ValidationErrors | null {
    return DatesValidatorDirective.checkDates(control);
  }
}
