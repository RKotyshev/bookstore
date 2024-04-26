import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { map } from 'rxjs';

import { AuthorizationService } from '../services/authorization.service';
import { IJwtTokenStatus } from '../interfaces/authorization';


export const unauthorizedOnlyGuard: CanMatchFn = () => {
  const authService = inject(AuthorizationService);
  const router = inject(Router);

  return authService.verifyToken('access').pipe(
    map((response: IJwtTokenStatus | null) => {
      return response ? router.parseUrl('/') : true;
    }),
  );
};
