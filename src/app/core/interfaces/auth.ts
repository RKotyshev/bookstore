import { FormControl } from '@angular/forms';

export interface IAuthForm {
  email: FormControl<string>,
  password: FormControl<string>,
}
