import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import moment from 'moment';


export function writingDateValidator(maxDate: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const datesDiff = moment(maxDate).diff(moment(control.value));

    return datesDiff < 0 ? {
      invalidWritingDate: { value: moment(control.value).format('YYYY-MM-DD') },
    } : null;
  };
}
