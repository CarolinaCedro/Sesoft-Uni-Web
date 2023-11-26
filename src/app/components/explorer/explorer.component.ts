import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/api/users.service";
import {User} from "../../interfaces/user.models";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  users: User[] = []
  picProfile: string = ""

  constructor(private userService: UserService, private service: PostService) {
  }

  ngOnInit(): void {
    this.service.profileImageChanged.subscribe((imageUrl) => {
      this.picProfile = imageUrl;
    });
    this.userService.getMe().subscribe(
      res => {
        this.picProfile = res?.profile?.icon?.url
      });
    this.getMyAllFollowers()
    this.getStatusOnBtn()
  }

  getMyAllFollowers() {
    this.userService.getAllUsers().subscribe(
      res => {
        console.log("res", res)
        this.users = res?.result
      }
    )
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




  updateStatus(user: User) {
    user.following = false;
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



}
