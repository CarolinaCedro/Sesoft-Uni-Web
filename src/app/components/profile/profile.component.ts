import { Component } from '@angular/core';
import { UserService } from 'src/app/services/api/users.service';
import { PostNotificationService } from '../listeners/post-notification-service.service';
import { getFromLocalStorage } from 'src/utils/local-storage.util';

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  postsCount: number;
  followingsCount: number;
  followersCount: number;
  profile: {
    id: string;
    displayName: string;
    bio: string | null;
    websiteUrl: string | null;
    createdAt: string;
    updatedAt: string;
    iconStorageId: string | null;
    icon: UserIconProps;
  };
}

type UserIconProps = {
  id: string;
  url?: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  activeTab: string = 'postagens';
  loading: boolean = false;
  user: UserProfile = {} as UserProfile;
  mePosts: any;
  likedPosts: any;
  authUser: any;

  constructor(
    private readonly service: UserService,
    private readonly postNotificationService: PostNotificationService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.listenerWhenPostWasCreated();
    this.listenerWhenPostWasDeleted();

    this.authUser = getFromLocalStorage('me_%sesoftuni%');

    this.getMe();
    this.getPosts();
    this.getLikedPosts();

    this.loading = false;
  }

  private listenerWhenPostWasCreated() {
    this.postNotificationService.postCreated$.subscribe(() => {
      this.getMe();
      this.getPosts();
    });
  }

  private listenerWhenPostWasDeleted() {
    this.postNotificationService.postDeleted$.subscribe(() => {
      this.getMe();
      this.getPosts();
    });
  }

  private getMe() {
    this.service.getMe().subscribe(
      res => {
        this.user = res;
      });
  }

  private getPosts() {
    this.service.getUserPosts(this.authUser.id).subscribe(
      res => {
        this.mePosts = res;
      });
  }

  private getLikedPosts() {
    this.service.getUserLikedPosts(this.authUser.id).subscribe(
      res => {
        this.likedPosts = res;
      });
  }
}
