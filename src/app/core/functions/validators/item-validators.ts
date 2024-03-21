import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IItem } from '../../interfaces/item';


export function maxFileSize(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const items: IItem[] | null = control.value;

    if (!items) {
      return null;
    }

    const invalidSizeFiles = Array.from(items).filter((item: IItem) => {
      return item.size > maxSize;
    });

    return invalidSizeFiles.length ? { fileMaxSize: invalidSizeFiles } : null;

  };
}

export function acceptFileType(acceptTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const items: IItem[] | null = control.value;

    if (!items) {
      return null;
    }

    const invalidTypeFiles = Array.from(items).filter((item: IItem) => {
      console.log(item.type);
      
      return !acceptTypes.includes(item.type);
    });

    return invalidTypeFiles.length ? { acceptFileType: invalidTypeFiles } : null;
  };
}
