import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { map } from 'rxjs';

import { AuthorizationService } from '../services/authorization.service';


export const authorizationGuard: CanMatchFn = () => {
  const authService = inject(AuthorizationService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    map((isLogged: boolean) => {
      if (!isLogged) {
        return router.parseUrl('/authorization');
      }

      return true;
    }),
  );
};
