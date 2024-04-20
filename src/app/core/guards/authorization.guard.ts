import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthorizationService } from '../services/authorization.service';


export const authorizationGuard: CanMatchFn = () => {
  const authService = inject(AuthorizationService);
  const router = inject(Router);

  const accessToken = authService.getAccessToken();

  return !accessToken ? router.parseUrl('/authorization') : true;

  // return authService.isLoggedIn$.pipe(
  //   // skip(1),
  //   debounceTime(300),
  //   map((isLogged: boolean) => {
  //     if (!isLogged) {
  //       return router.parseUrl('/authorization');
  //     }

  //     return true;
  //   }),
  // );
};
