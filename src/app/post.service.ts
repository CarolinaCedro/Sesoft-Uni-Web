import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";
import { PostResponseModel } from "./interfaces/post-response.models";
import { getFromLocalStorage } from 'src/utils/local-storage.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly url: string = "https://sesoft-uni-backend-development.up.railway.app/"
  private readonly endpoint = 'posts'

  constructor(private http: HttpClient, private route: Router) { }

  getAllPosts(skip: number, take: number): Observable<any> {
    const url = `${this.url}timeline`;

    const params = {
      skip: skip.toString(),
      take: take.toString(),
    };

    return this.http.get(url, { params }).pipe(
      catchError(err => {
        return throwError(err);
      }),
      tap(res => {
        console.log("aqui os resultados", res);
      })
    );
  }

  like(postId: string) {
    const url = `${this.url}posts/${postId}/like`;

    return this.http.post(url, {}).pipe();
  }

  unlike(postId: string) {
    const url = `${this.url}posts/${postId}/unlike`;

    return this.http.post(url, {}).pipe();
  }

  getPostById(id: string): Observable<PostResponseModel> {
    const token = getFromLocalStorage('token_%sesoftuni%');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<PostResponseModel>(`${environment.apiUrl}${this.endpoint}/${id}`, { headers }).pipe();
  }

  createPost(post: PostResponseModel): Observable<any> {
    return this.http.post(this.url + "posts", post).pipe(
      catchError(err => {
        return throwError(err)
      }),
      tap(res => console.log(res))
    )
  }


  getHeaders(): HttpHeaders {
    const token = getFromLocalStorage('token_%sesoftuni%');
    if (token) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + token,
      });
    } else {
      // TODO:LEMBRAR caso em que o token não está disponível, por exemplo, lançando um erro ou retornando um conjunto padrão de cabeçalhos.
      return new HttpHeaders({
        'Authorization': 'Bearer ' + 'seu_token_padrão',
      });
    }
  }
}
