import {Component} from '@angular/core';
import {UserService} from 'src/app/services/api/users.service';
import {of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  userFilter: any;

  loading: boolean = false;
  private searchQuerySubject = new Subject<string>();
  public showContainer: boolean = true;
  public hideContainer: boolean = false;

  constructor(private readonly service: UserService, private router: Router) {
    this.searchQuerySubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          this.loading = true;
          this.searchResults = [];

          if (query.trim() === '') {
            this.loading = false;
            return of([]);
          }

          return this.service.findUsers(query);
        })
      )
      .subscribe((res) => {
        this.searchResults = res.result;
        this.loading = false;
      });
  }

  onSearchInput() {
    this.searchQuerySubject.next(this.searchQuery);
  }

  getUserId(id: any) {
    console.log("Id ", id)
    this.showContainer = false;
    this.hideContainer = true

    this.service.findById(id).subscribe(
      res => {
        console.log("Este é o cara filtrado", res)
        this.userFilter = res
      }
    )
    // this.router.navigate(['home/profile'])
  }
}
