import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserRole } from '../models/userData.model';

export const canLogin: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole: UserRole | undefined = authService.userData()?.role;

  if (userRole) {
    router.navigate([`/${userRole}`]);
    return false;
  }

  return true;
};
