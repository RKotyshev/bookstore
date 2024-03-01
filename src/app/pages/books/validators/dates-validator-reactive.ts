import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const DatesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const writingDate = control.get('writing_date')?.value;
  const releaseDate = control.get('release_date')?.value;
  const datesDiff = Date.parse(releaseDate) - Date.parse(writingDate);

  return datesDiff < 0 ? { invalidWritingDate: true } : null;
};
