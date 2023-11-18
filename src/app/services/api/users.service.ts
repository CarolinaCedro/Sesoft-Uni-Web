import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, tap, throwError} from "rxjs";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private route: Router) { }

  findUsers(searchQuery: string): Observable<any> {
    const params = {
      search: searchQuery
    };
    const endpoint = 'users'

    return this.http.get(environment.apiUrl + endpoint, { params }).pipe()
  }

  getMe(): Observable<any> {
    const endpoint = 'users/me'

    return this.http.get(environment.apiUrl + endpoint).pipe()
  }

  getMePosts(): Observable<any> {
    const endpoint = 'users/me/posts'

    return this.http.get(environment.apiUrl + endpoint).pipe()
  }

  getUserLikedPosts(userId: string): Observable<any> {
    const endpoint = `users/${userId}/posts/liked`

    return this.http.get(environment.apiUrl + endpoint).pipe()
  }

  getUserPosts(userId: string): Observable<any> {
    const endpoint = `users/${userId}/posts`

    return this.http.get(environment.apiUrl + endpoint).pipe()
  }

  findById(id: string): Observable<any> {
    const endpoint = `users/find/${id}`
    return this.http.get(environment.apiUrl + endpoint).pipe()
  }

  getAllUsers(): Observable<any> {
    const endpoint: string = 'users'
    return this.http.get<any>(environment.apiUrl + endpoint).pipe()
  }

  ///users/me/following

  follow(id: string): Observable<any> {
    const endpoint = `users/${id}/follow`;
    return this.http.post<any>(environment.apiUrl + endpoint, id).pipe(
      catchError(err => {
        return throwError(err);
      }),
      tap(res => {
        if (res instanceof Observable) {
          // Se res for um Observable, faça algo apropriado aqui
          console.log("Response is an Observable");
        } else {
          console.log(res);
        }
      })
    );
  }


  ///users/{id}/unfollow
  unfollow(id: string): Observable<any> {
    const endpoint = `users/${id}/unfollow`
    return this.http.post<any>(environment.apiUrl + endpoint, id).pipe(
      catchError(err => {
        return throwError(err)
      }),
      tap(res => console.log(res))
    )
  }

  getFollowingUsers() {
    const endpoint: string = 'users/me/following'
    return this.http.get<any>(environment.apiUrl + endpoint).pipe()
  }
}
