import { CanActivateFn } from '@angular/router';
import { getFromLocalStorage } from 'src/utils/local-storage.util';

export const autorizationGuard: CanActivateFn = (route, state) => {
  return !!getFromLocalStorage('token_%sesoftuni%');
};
