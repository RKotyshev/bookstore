import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { map, of, switchMap } from 'rxjs';

import { AuthorizationService } from '../services/authorization.service';
import { IJwtTokenStatus } from '../interfaces/authorization';


export const authorizationGuard: CanMatchFn = () => {
  const authService = inject(AuthorizationService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    switchMap((isLogged: boolean) => {
      if (isLogged) {
        return of(true);
      }

      return authService.verifyToken('access');
    }),
    map((loggedOrResponse: boolean | IJwtTokenStatus | null) => {
      return loggedOrResponse === null ? router.parseUrl('/authorization') : true;
    }),
  );
};
