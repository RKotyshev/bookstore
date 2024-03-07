import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function datesCompareValidator(
  firstControlName: string,
  secondControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstDate = control.get(firstControlName)?.value;
    const secondDate = control.get(secondControlName)?.value;
    const datesDiff = Date.parse(secondDate) - Date.parse(firstDate);

    return datesDiff < 0 ? { datesCompare: true } : null;
  };
}
