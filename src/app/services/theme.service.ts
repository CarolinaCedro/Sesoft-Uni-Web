import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkThemeSubject = new BehaviorSubject<boolean>(false);

  isDarkTheme$ = this.darkThemeSubject.asObservable();

  toggleDarkTheme() {
    document.body.classList.toggle("dark-theme")
    this.darkThemeSubject.next(!this.darkThemeSubject.value);
  }
}
