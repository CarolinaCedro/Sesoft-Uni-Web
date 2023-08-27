import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, tap, throwError} from "rxjs";
import {PostResponseModel} from "./interfaces/post-response.models";

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private url: string = "https://sesoft-uni-backend-development.up.railway.app/posts/"

  constructor(private http: HttpClient, private route: Router) {
  }

  // getAllPosts(): Observable<any> {
  //   return this.http.get()
  // }

  getPostById(id: string): Observable<PostResponseModel> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<PostResponseModel>(this.url + id, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching post:', error);
        return throwError(error);
      }),
      tap(res => {
        console.log('Fetched post:', res);
      })
    );
  }
}
