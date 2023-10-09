import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, tap, throwError} from "rxjs";
import {PostResponseModel} from "./interfaces/post-response.models";

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private url: string = "https://sesoft-uni-backend-development.up.railway.app/"

  constructor(private http: HttpClient, private route: Router) {
  }

  // getAllPosts(): Observable<any> {
  //   return this.http.get()
  // }


  getAllPosts(skip: number, take: number): Observable<any> {
    const headers = this.getHeaders();
    // url com os parâmetros skip e take
    const url = `${this.url}timeline?skip=${skip}&take=${take}`;

    return this.http.get(url, {headers}).pipe(
      catchError(err => {
        return throwError(err);
      }),
      tap(res => {
        console.log("aqui os resultados", res);
      })
    );
  }


  getPostById(id: string): Observable<PostResponseModel> {
    const headers = this.getHeaders();

    return this.http.get<PostResponseModel>(this.url + "/posts" + id, {headers}).pipe(
      catchError(error => {
        console.error('Error fetching post:', error);
        return throwError(error);
      }),
      tap(res => {
        console.log('Fetched post:', res);
      })
    );
  }

  createPost(post: PostResponseModel): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.url + "posts", post, {headers}).pipe(
      catchError(err => {
        return throwError(err)
      }),
      tap(res => console.log(res))
    )
  }


  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

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
