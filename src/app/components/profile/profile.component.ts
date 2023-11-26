import {Component} from '@angular/core';
import {UserService} from 'src/app/services/api/users.service';
import {PostNotificationService} from '../listeners/post-notification-service.service';
import {getFromLocalStorage} from 'src/utils/local-storage.util';
import {PostService} from "../../services/post.service";
import {User} from "../../interfaces/user.models";

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

  following: boolean

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

  users: User[] = []

  constructor(
    private readonly service: UserService,
    private readonly postNotificationService: PostNotificationService,
    private profileImageChanged: PostService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.profileImageChanged.profileImageChanged.subscribe((imageUrl) => {
      this.authUser = imageUrl;
    });

    this.loading = true;
    this.listenerWhenPostWasCreated();
    this.listenerWhenPostWasDeleted();

    this.authUser = getFromLocalStorage('me_%sesoftuni%');

    this.getMe();
    this.getPosts();
    this.getLikedPosts();
    this.getStatusOnBtn()


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


  getStatusOnBtn() {
    this.userService.getAllUsers().subscribe(
      res => {
        console.log("todos os usuários", res);
        const allUsers = res?.result;

        this.userService.getFollowingUsers().subscribe(
          followingUsers => {
            console.log("usuários que estou seguindo", followingUsers?.result);

            // Filtrando os usuários pra pegar só o que eu n sigo
            this.users = allUsers.map((user: UserProfile) => {
              const isFollowing = followingUsers?.result.some((followingUser: {
                id: any;
              }) => followingUser.id === user.id);
              return new (user.id, user.email, user.profile, user.username, isFollowing);
            });

          }
        );
      }
    );
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
