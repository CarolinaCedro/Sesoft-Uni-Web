import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
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

  findById(id: string): Observable<any> {
    const endpoint = `users/find/${id}`
    return this.http.get(environment.apiUrl + endpoint).pipe()
  }
}
