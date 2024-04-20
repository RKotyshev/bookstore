import { FormControl } from '@angular/forms';


export interface IRegistrationForm {
  email: FormControl<string>,
  password: FormControl<string>,
  passwordConfirm?: FormControl<string>,
}

export interface IAvailableEmail {
  isAvailable: boolean,
}

export interface IRequestRegistration {
  email: string,
  password: string,
}

export interface IUser {
  id:	number,
  email: string,
  password:	string,
  isSuperuser: boolean,
  isStaff: boolean,
  isActive: boolean,
  dateJoined: string,
  lastLogin: string,
}
