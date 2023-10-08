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
  private readonly endpoint = 'posts'

  constructor(private http: HttpClient, private route: Router) {
  }

  getPostById(id: string): Observable<PostResponseModel> {
    const token = getFromLocalStorage('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<PostResponseModel>(`${environment.apiUrl}${this.endpoint}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching post:', error);
        return throwError(error);
      }),
    );
  }
}
