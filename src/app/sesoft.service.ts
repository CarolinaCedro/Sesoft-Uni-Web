import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SesoftService {


  constructor(private http: HttpClient, private route: Router) {
  }

  url: string = "https://sesoft-uni-backend-development.up.railway.app/"

  signUp(body: any): Observable<any> {
    return this.http.post(this.url + "auth/signup", body).pipe(
      map(response => response),
      catchError(error => throwError(error))
    );
  }

  login(payload: any): Observable<any> {
    return this.http.post(this.url + "auth/signin", payload, {responseType: 'text'}).pipe(
      map((res) => {
        localStorage.removeItem('token')
        localStorage.setItem('token', res);
        console.log("Usuário logado com sucesso");
        this.route.navigate(['home'])
        return res; // Retornar a string do token
      }),
      catchError((error) => {
        console.log('Erro ao fazer login:', error);
        throw error;
      })
    );
  }
}
