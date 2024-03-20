import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function maxFileSize(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const files: FileList | null = control.value;

    if (!files) {
      return null;
    }

    const invalidSizeFiles = Array.from(files).filter((file: File) => {
      return file.size > maxSize;
    });

    return invalidSizeFiles.length ? { fileMaxSize: invalidSizeFiles } : null;

  };
}

export function acceptFileType(acceptTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const files: FileList | null = control.value;

    if (!files) {
      return null;
    }

    const invalidTypeFiles = Array.from(files).filter((file: File) => {
      console.log(file.type);
      
      return !acceptTypes.includes(file.type);
    });

    return invalidTypeFiles.length ? { acceptFileType: invalidTypeFiles } : null;
  };
}
