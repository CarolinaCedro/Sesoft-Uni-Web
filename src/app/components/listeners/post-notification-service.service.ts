import {Injectable} from '@angular/core';

import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostNotificationService {
  private postCreatedSubject = new Subject<void>();

  postCreated$ = this.postCreatedSubject.asObservable();

  notifyPostCreated() {
    this.postCreatedSubject.next();
  }
}
