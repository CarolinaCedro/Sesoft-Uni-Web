import {Component, OnInit} from '@angular/core';
import {User} from "../../../../interfaces/user.models";
import {UserService} from "../../../../services/api/users.service";

@Component({
  selector: 'app-colum-explorer',
  templateUrl: './colum-explorer.component.html',
  styleUrls: ['./colum-explorer.component.scss']
})
export class ColumExplorerComponent implements OnInit {

  users: User[] = []


  constructor(private userService: UserService,) {
  }

  ngOnInit(): void {
    this.getStatusOnBtn()
  }

  getMyAllFollowers() {
    this.userService.getAllUsers().subscribe(
      res => {
        console.log("res", res);
        this.users = res?.result.slice(0, 6);
      }
    );
  }


  getStatusOnBtn() {
    this.userService.getAllUsers().subscribe(
      res => {
        console.log("todos os usuários", res);
        const allUsers = res?.result;

        this.userService.getFollowingUsers().subscribe(
          followingUsers => {
            console.log("usuários que estou seguindo", followingUsers?.result);

            // Filtrando os usuários para pegar só o que eu não sigo
            this.users = allUsers.map((user: User) => {
              const isFollowing = followingUsers?.result.some((followingUser: {
                id: any;
              }) => followingUser.id === user.id);
              return new User(user.id, user.email, user.profile, user.username, isFollowing);
            });

            // Limitando a lista
            this.users = this.users.slice(0, 6);
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


}
