import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  const toastr = inject(ToastrService);
  // Check for the JWT token in the cookie

  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer', '');
   const decodedToken: any = token = jwtDecode(token);

   // Check if the token has expired

   const expiratonDate = decodedToken.exp * 1000;
   const currentTime = new Date().getTime();

    if (expiratonDate < currentTime) {
      // Logout the user
      authService.logout();
      router.navigateByUrl('/login');
      toastr.error('Session expired, please login again');
      return router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
    }else {
      // Token is still valid, so the user is logged in
      if (user.roles.includes('Writer')) {
        return true;
      }else {
        toastr.error('You are not authorized to access this page');
        router.navigateByUrl('/');
        return false;
      }
    }
  } else {
    // Logout the user
    authService.logout();
    router.navigateByUrl('/');
    toastr.error('You are not authorized to access this page');
    return router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
  }

};
