import { Component } from '@angular/core';
import { UserService } from 'src/app/services/api/users.service';
import { PostNotificationService } from '../listeners/post-notification-service.service';
import { UserProfile } from '../profile/profile.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent {
  private userId: string = '';

  activeTab: string = 'postagens';
  loading: boolean = false;
  user: UserProfile = {} as UserProfile;
  mePosts: any;

  constructor(
    private readonly service: UserService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loading = true;

    this.getUser();
    this.getUserPosts();

    this.loading = false;
  }

  private getUser() {

    this.service.findById(this.userId).subscribe(
      res => {
        this.user = res;
      });
  }

  private getUserPosts() {
    this.service.getUserPosts(this.userId).subscribe(
      res => {
        this.mePosts = res;
      });
  }
}
