import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, tap, throwError} from "rxjs";
import {PostResponseModel} from "../interfaces/post-response.models";
import {getFromLocalStorage} from 'src/utils/local-storage.util';
import {environment} from 'src/environments/environment';
import {Post} from '../components/post/post.component';
import {User} from "../interfaces/user.models";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly url: string = environment.apiUrl
  private readonly endpoint = 'posts'

  profileImageChanged: EventEmitter<string> = new EventEmitter<string>();

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
      })
    );
  }

  notifyProfileImageChanged(imageUrl: string) {
    this.profileImageChanged.emit(imageUrl);
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

  createPost(post: any): Observable<any> {
    console.log("aqui os dados que vem pro service", post);

    return this.http.post(this.url + 'posts', post).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      tap((res) => console.log(res))
    );
  }


  uploadProfilePicture(post: FormData): Observable<User> {
    console.log("UPLOAD aqui os dados que vem pro service", post);

    return this.http.post<User>(this.url + 'users/upload', post).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      tap((res) => {
        console.log("aqui nova image",res?.profile?.icon?.url);
        // Notificar sobre a mudança de imagem de perfil
        this.notifyProfileImageChanged(res?.profile?.icon?.url); // Certifique-se de adaptar isso à sua resposta do servidor
      })
    );
  }




  find(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}${this.endpoint}/${id}`).pipe();
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

  deletePostById(id: string) {
    return this.http.delete(this.url + "posts/" + id).pipe(
      catchError(err => {
        return throwError(err)
      }),
      tap(res => console.log(res))
    )
  }

  reply(postId: string, content: string): Observable<any> {
    return this.http.post(`${this.url}posts/${postId}/reply`, { content }).pipe();
  }

}
