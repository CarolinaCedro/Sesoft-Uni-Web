import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SesoftService } from "../services/sesoft.service";

const LOGIN_URL = ["login"];

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: SesoftService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated()) {
      // Se o usuário não estiver autenticado, estou mandando para a página de login
      this.router.navigate(LOGIN_URL);
      return false; // Não permite o acesso à rota protegida
    }
    return true; // Permite o acesso à rota protegida
  }
}
