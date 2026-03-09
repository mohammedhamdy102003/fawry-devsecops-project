import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const customerGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('customer')) {
    return true;
  } else {
    return _Router.navigate(['/customer-login']);
  }
};
