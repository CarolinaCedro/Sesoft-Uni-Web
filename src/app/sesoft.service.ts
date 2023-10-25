import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { saveToLocalStorage } from 'src/utils/local-storage.util';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

export type LoginResponseProps = {
  token: string;
}

export type LoginRequestProps = {
  displayName: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SesoftService {
  private TOKEN: string = "token_%sesoftuni%";
  constructor(private http: HttpClient, private route: Router) {
  }

  signUp(body: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/signup`, body).pipe(
      map(response => response),
      catchError(error => throwError(error))
    );
  }

  login(payload: LoginRequestProps): Observable<LoginResponseProps> {
    return this.http.post<LoginResponseProps>(`${environment.apiUrl}auth/signin`, payload).pipe(
      map(({ token }: LoginResponseProps) => {
        saveToLocalStorage('token_%sesoftuni%', token);
        this.route.navigate(['home']);
        return { token };
      }),
      catchError((error) => {
        console.error('Erro ao fazer login:', error);
        throw error;
      })
    );
  }

  public logout(): Observable<boolean> {
    try {
      localStorage.removeItem(this.TOKEN);
      this.route.navigate(['login']);
      return of(true); // Retorna um observable com valor true para indicar sucesso
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return of(false); // Retorna um observable com valor false para indicar erro
    }
  }


  get isLoged(): boolean {
    return this.containsToken();
  }

  public containsToken(): boolean {
    return localStorage.getItem(this.TOKEN) == null ? false : true;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN);

    if (!token) return false;

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
}
