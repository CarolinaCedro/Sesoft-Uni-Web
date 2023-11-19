import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../interfaces/user.models";
import {UserService} from "../../../services/api/users.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() profilePicture: string | undefined = '';
  @Input() displayName: string = '';
  @Input() followersCount: number = 0;
  @Input() followingsCount: number = 0;
  @Input() username: string = '';
  @Input() bio: string = '';
  @Input() postsCount: number = 0;
  @Input() posts: any;
  @Input() likedPosts: any;


  users: User[] = []

  followers: [] = []

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getMyAllFollowers()
    this.getStatusOnBtn()
  }

  getMyAllFollowers() {
    this.userService.getFollowingUsers().subscribe(
      res => {
        console.log("res", res)
        this.users = res?.result
      }
    )
  }

  getStatusOnBtn() {
    this.userService.getFollowingUsers().subscribe(
      res => {
        console.log("todos os usuários", res);
        const allUsers = res?.result;

        this.userService.getFollowingUsers().subscribe(
          followingUsers => {
            console.log("usuários que estou seguindo", followingUsers?.result);

            // Filtrando os usuários pra pegar só o que eu n sigo
            this.users = allUsers.map((user: User) => {
              const isFollowing = followingUsers?.result.some((followingUser: {
                id: any;
              }) => followingUser.id === user.id);
              return new User(user.id, user.email, user.profile, user.username, isFollowing);
            });

          }
        );
      }
    );
  }

  onFollow(user: User) {
    this.userService.follow(user.id).subscribe(
      res => {
        user.following = true
      }
    );
  }


  unFollow(user: User) {
    this.userService.unfollow(user.id).subscribe(
      res => {
        user.following = false
      }
    );
  }

  // getFollowers() {
  //   this.userService.getFollowingUsers().subscribe()
  // }
  //
  // isFollowing(): boolean {
  //
  // }
}
