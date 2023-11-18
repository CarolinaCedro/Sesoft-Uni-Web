import {PostNotificationService} from "../listeners/post-notification-service.service";

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalPostComponent} from "../modal-post/modal-post.component";
import {PostService} from "../../post.service";
import {getFromLocalStorage, removeToLocalStorage} from 'src/utils/local-storage.util';
import {UserService} from "../../services/api/users.service";
import {User} from "../../interfaces/user.models";
import {BehaviorSubject, tap} from "rxjs";
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

  user: User[] = []



  constructor(public dialog: MatDialog, private service: PostService,
              private postNotificationService: PostNotificationService,
              private userService: UserService,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getAllUsersFollow()
    this.authUser = getFromLocalStorage('me_%sesoftuni%');
  }


  singOut() {
    removeToLocalStorage('me_%sesoftuni%');
    removeToLocalStorage('token_%sesoftuni%');
  }

  getAllUsersFollow() {
    this.userService.getAllUsers().subscribe(
      res => {
        console.log("todos os usuários", res);
        const allUsers = res?.result;

        // Chame o método para obter os usuários que você está seguindo
        this.userService.getFollowingUsers().subscribe(
          followingUsers => {
            console.log("usuários que estou seguindo", followingUsers?.result);

            // Filtre os usuários para obter aqueles que você ainda não está seguindo
            this.user = allUsers.filter((user: { id: any; }) =>
              !followingUsers?.result.some((followingUser: { id: any; }) => followingUser.id === user.id)
            ).slice(0, 5);
          }
        );
      }
    );
  }


  openDialog() {
    this.dialog.open(ModalPostComponent);
  }


  onFollow(user: User) {
    console.log("aqui o user", user);

    if (user.following) {
      this.userService.unfollow(user.id).subscribe(
        tap((res) => {
          console.log("Unfollow", res);
          this.openSnackBar(`Deixou de seguir ${user.username}`);
          user.following = false;

          // Recarregar a lista após deixar de seguir
          this.reloadUserList();
        })
      );
    } else {
      // Lógica para seguir o usuário
      this.userService.follow(user.id).subscribe(
        tap((res) => {
          this.reloadUserList();
          console.log("Seguindo", res);
          this.openSnackBar(`Seguindo ${user.username}`);
          user.following = true;

          // Remover o usuário da lista após seguir com sucesso
          this.user = this.user.filter(u => u.id !== user.id);
        })
      );
    }
  }

  reloadUserList() {
    this.userService.getAllUsers().subscribe(
      res => {
        console.log("todos os usuários", res);
        const allUsers = res?.result;

        // Chame o método para obter os usuários que você está seguindo
        this.userService.getFollowingUsers().subscribe(
          followingUsers => {
            console.log("usuários que estou seguindo", followingUsers?.result);

            // Filtre os usuários para obter aqueles que você ainda não está seguindo
            this.user = allUsers.filter((user: { id: any; }) =>
              !followingUsers?.result.some((followingUser: { id: any; }) => followingUser.id === user.id)
            ).slice(0, 5);
          }
        );
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
