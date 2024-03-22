import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IItem } from '../../interfaces/item';


export interface IFileSize {
  size: number,
  unit: 'Byte' | 'KB' | 'MB',
}

export function maxFileSize(maxSize: IFileSize): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const kbPerByte = 1e3;
    const mbPerByte = 1e6;
    const items: IItem[] | null = control.value;

    if (!items) {
      return null;
    }

    const invalidSizeFiles = Array.from(items).filter((item: IItem) => {
      switch (maxSize.unit) {
        case 'Byte':
          return item.size > maxSize.size;
        case 'KB':
          return item.size / kbPerByte > maxSize.size;
        case 'MB':
          return item.size / mbPerByte > maxSize.size;
      }
      
      return false; // ESLINT: expects a value to be returned. Incorrect eslint rule?
    });

    return invalidSizeFiles.length ? { maxFileSize: invalidSizeFiles } : null;

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
