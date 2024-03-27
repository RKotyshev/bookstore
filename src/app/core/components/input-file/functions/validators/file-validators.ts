import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { IInputFileItem } from '../../interfaces/input-file-item';
import { transformSize } from '../transform-files';


export interface IFileSize {
  size: number,
  unit: 'Byte' | 'KB' | 'MB',
}

export function maxFileSize(maxSize: IFileSize): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const items: IInputFileItem[] | null = control.value;

    if (!items) {
      return null;
    }
    
    const maxBytesSize = transformSize(maxSize);

    const invalidSizeFiles = Array.from(items).filter((item: IInputFileItem) => {
      return item.size > maxBytesSize!; 
    });

    return invalidSizeFiles.length ? { maxFileSize: invalidSizeFiles } : null;

  };
}

export function acceptFileType(acceptTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const items: IInputFileItem[] | null = control.value;

    if (!items) {
      return null;
    }

    const invalidTypeFiles = Array.from(items).filter((item: IInputFileItem) => {      
      return !acceptTypes.includes(item.type);
    });

    return invalidTypeFiles.length ? { acceptFileType: invalidTypeFiles } : null;
  };
}
