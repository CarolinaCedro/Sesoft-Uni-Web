import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  private profilePictureSubject = new BehaviorSubject<string>('/path/to/default/profile.jpg');
  profilePicture$ = this.profilePictureSubject.asObservable();

  setProfilePicture(url: string) {
    this.profilePictureSubject.next(url);
  }
}
