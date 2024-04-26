import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function identicalValuesValidator(
  firstControlName: string,
  secondControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(firstControlName);
    const secondControl = control.get(secondControlName);
    const isIdenticalValues = firstControl!.value === secondControl!.value;
    const isControlsDirty = firstControl!.dirty && secondControl!.dirty;

    return !isIdenticalValues && isControlsDirty ? {
      identicalValues: true,
    } : null;
  };
}
