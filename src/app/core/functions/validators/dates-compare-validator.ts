import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function datesCompareValidator(lessControl: string, greatControl: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const lessDate = control.get(lessControl)?.value;
    const greatDate = control.get(greatControl)?.value;
    const datesDiff = Date.parse(lessDate) - Date.parse(greatDate);
  
    return datesDiff < 0 ? { invalidDate: true } : null;
  };
}
