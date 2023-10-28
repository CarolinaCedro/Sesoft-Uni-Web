import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";
import { getFromLocalStorage } from 'src/utils/local-storage.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly endpoint = 'users'

  constructor(private http: HttpClient, private route: Router) { }

  findUsers(searchQuery: string): Observable<any> {
    const params = {
      search: searchQuery
    };

    return this.http.get(environment.apiUrl + this.endpoint, { params }).pipe()
  }
}
