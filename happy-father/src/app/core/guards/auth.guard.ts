import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard que protege las rutas que requieren autenticación
 * Redirige al login si el usuario no está autenticado
 */
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

/**
 * Guard que previene el acceso al login si ya está autenticado
 * Redirige al home si el usuario ya está logueado
 */
export const loginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};