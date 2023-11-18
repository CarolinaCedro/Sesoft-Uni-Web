import {PostNotificationService} from "../listeners/post-notification-service.service";

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalPostComponent} from "../modal-post/modal-post.component";
import {PostService} from "../../post.service";
import {getFromLocalStorage, removeToLocalStorage} from 'src/utils/local-storage.util';
import {UserService} from "../../services/api/users.service";
import {User} from "../../interfaces/user.models";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authUser: any;
  // posts: Array<PostResponseModel> = []
  posts: any = []
  likes!: number;
  coments!: number;

  users: User[] = []



  constructor(public dialog: MatDialog, private service: PostService,
              private postNotificationService: PostNotificationService,
              private userService: UserService,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    // this.getMyAllFollowers()
    this.getStatusOnBtn()
    this.authUser = getFromLocalStorage('me_%sesoftuni%');
  }


  singOut() {
    removeToLocalStorage('me_%sesoftuni%');
    removeToLocalStorage('token_%sesoftuni%');
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
              const isFollowing = followingUsers?.result.some((followingUser: { id: any; }) => followingUser.id === user.id);
              return new User(user.id, user.email, user.profile, user.username, isFollowing);
            });

            // Limitando a lista
            this.users = this.users.slice(0, 6);
          }
        );
      }
    );
  }



  openDialog() {
    this.dialog.open(ModalPostComponent);
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




  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
