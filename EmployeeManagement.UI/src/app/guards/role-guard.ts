import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router);
  const authService = inject(Auth);

  const requiredRoles = route.data['roles'] as string[];

  const userRole = authService.getRole();

  if (userRole && requiredRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};