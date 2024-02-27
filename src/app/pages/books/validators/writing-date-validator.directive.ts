import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { writingDateValidator } from './writing-date-validator';


@Directive({
  selector: '[appWritingDateValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: WritingDateValidatorDirective,
    multi: true,
  }],
})
export class WritingDateValidatorDirective implements Validator {
  @Input() public appWritingDateValidator = '';

  constructor() { }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.appWritingDateValidator ?
      writingDateValidator(this.appWritingDateValidator)(control) : null;
  }
}
