import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { IDetailedItemSize, IInputItem } from '../../interfaces/input-item';
import { transformSize } from '../transform-files';


export function maxFileSize(maxSize: IDetailedItemSize): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const items: IInputItem[] | null = control.value;

    if (!items) {
      return null;
    }
    
    const maxBytesSize = transformSize(maxSize);

    const invalidSizeFiles = Array.from(items).filter((item: IInputItem) => {
      return item.size > maxBytesSize!; 
    });

    return invalidSizeFiles.length ? { maxFileSize: invalidSizeFiles } : null;

  };
}

export function acceptFileType(acceptTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const items: IInputItem[] | null = control.value;

    if (!items) {
      return null;
    }

    const invalidTypeFiles = Array.from(items).filter((item: IInputItem) => {      
      return !acceptTypes.includes(item.type);
    });

    return invalidTypeFiles.length ? { acceptFileType: invalidTypeFiles } : null;
  };
}
