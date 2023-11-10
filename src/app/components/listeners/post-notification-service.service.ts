import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostNotificationService {
  private postCreatedSubject = new Subject<void>();
  private postDeletedSubject = new Subject<void>();

  postCreated$ = this.postCreatedSubject.asObservable();
  postDeleted$ = this.postDeletedSubject.asObservable();

  notifyPostCreated() {
    this.postCreatedSubject.next();
  }

  notifyPostDeleted() {
    this.postCreatedSubject.next();
  }
}
