import { FormControl } from '@angular/forms';


export interface IRegistrationForm {
  email: FormControl<string>,
  password: FormControl<string>,
  passwordConfirm: FormControl<string>,
}

export interface IAvailableEmail {
  isAvailable: boolean,
}
