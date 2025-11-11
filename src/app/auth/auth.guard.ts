import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';  // ✅ named import now

interface DecodedToken {
  exp: number;
  iat: number;
}

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authData = localStorage.getItem('authData');

  if (authData) {
    try {
      const { token } = JSON.parse(authData);
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        return true; // ✅ token valid
      }

      // ❌ Token expired
      localStorage.removeItem('authData');
      router.navigate(['/login']);
      return false;
    } catch (err) {
      console.error('AuthGuard error:', err);
    }
  }

  router.navigate(['/login']);
  return false;
};
