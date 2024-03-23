import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IItem } from '../../interfaces/item';


export interface IFileSize {
  size: number,
  unit: 'Byte' | 'KB' | 'MB',
}

export function maxFileSize(maxSize: IFileSize): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const bytesPerKb = 1e3;
    const bytesPerMb = 1e6;
    const items: IItem[] | null = control.value;

    if (!items) {
      return null;
    }

    const invalidSizeFiles = Array.from(items).filter((item: IItem) => {
      switch (maxSize.unit) {
        case 'Byte':
          return item.size > maxSize.size;
        case 'KB':
          return item.size / bytesPerKb > maxSize.size;
        case 'MB':
          return item.size / bytesPerMb > maxSize.size;
      }
      
      // FIXME:
      // ESLINT: still expects a value to be returned. Incompatible with 'switch' eslint rule?
      return false; 
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
