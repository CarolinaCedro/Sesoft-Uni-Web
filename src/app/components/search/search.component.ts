import { Component } from '@angular/core';
import { UserService } from 'src/app/services/api/users.service';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  loading: boolean = false;
  private searchQuerySubject = new Subject<string>();

  constructor(private readonly service: UserService) {
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
}
