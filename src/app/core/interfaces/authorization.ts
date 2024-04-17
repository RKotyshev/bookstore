import { FormControl } from '@angular/forms';

export interface IAuthorizationForm {
  email: FormControl<string>,
  password: FormControl<string>,
}
