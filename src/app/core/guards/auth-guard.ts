import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {AuthService} from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map(user => {
      if (user) {
        return true; // L'utilisateur est connecté, accès autorisé
      }
      router.navigate(['/login']); // Redirection vers le login
      return false; // Accès refusé
    })
  );
};
