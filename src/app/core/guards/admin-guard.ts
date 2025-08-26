import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {AuthService} from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userProfile$.pipe(
    map(profile => {
      if (profile?.role === 'admin') {
        return true; // C'est un admin, accès autorisé
      }
      router.navigate(['/franchisee/dashboard']); // Ce n'est pas un admin, on le redirige
      return false; // Accès refusé
    })
  );
};
