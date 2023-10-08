import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { saveToLocalStorage } from 'src/utils/local-storage.util';
import { environment } from 'src/environments/environment';

export type LoginProps = {
  token: string;
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

  login(payload: any): Observable<LoginProps> {
    return this.http.post<LoginProps>(`${environment.apiUrl}auth/signin`, payload).pipe(
      map(({ token }: LoginProps) => {
        saveToLocalStorage('token', token);
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
