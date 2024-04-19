import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function identicalValuesValidator(
  firstControlName: string,
  secondControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(firstControlName);
    const secondControl = control.get(secondControlName);
    const isIdentical = firstControl!.value === secondControl!.value;
    const isControlsDirty = firstControl!.dirty && secondControl!.dirty;

    return !isIdentical && isControlsDirty ? {
      identicalValues: true,
    } : null;
  };
}
