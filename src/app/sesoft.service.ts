import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { saveToLocalStorage } from 'src/utils/local-storage.util';
import { environment } from 'src/environments/environment';

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
}
