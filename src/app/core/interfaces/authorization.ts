import { FormControl } from '@angular/forms';

export interface IAuthorizationForm {
  email: FormControl<string>,
  password: FormControl<string>,
}

export interface IRequestAuthorization {
  email: string,
  password: string,
}

export interface IJwtTokens {
  refresh?: string,
  access?: string,
}

export interface IJwtTokenStatus {
    tokenType: 'access' | 'refresh',
    exp: number,
    iat: number,
    jti: string,
    userId: number,
}
