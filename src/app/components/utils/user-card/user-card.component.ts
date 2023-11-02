import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() profilePicture: string = '';
  @Input() displayName: string = '';
  @Input() followersCount: number = 0;
  @Input() followingsCount: number = 0;
  @Input() username: string = '';
  @Input() bio: string = '';
  @Input() postsCount: number = 0;
  @Input() posts: any;
  @Input() likedPosts: any;
}
