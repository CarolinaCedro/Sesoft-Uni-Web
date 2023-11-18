import {PostNotificationService} from "../listeners/post-notification-service.service";

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalPostComponent} from "../modal-post/modal-post.component";
import {PostService} from "../../post.service";
import {getFromLocalStorage, removeToLocalStorage} from 'src/utils/local-storage.util';
import {UserService} from "../../services/api/users.service";
import {User} from "../../interfaces/user.models";


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
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getAllUsers()
    this.authUser = getFromLocalStorage('me_%sesoftuni%');
  }


  singOut() {
    removeToLocalStorage('me_%sesoftuni%');
    removeToLocalStorage('token_%sesoftuni%');
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      res => {
        console.log("todos os usuários", res?.result)
        this.user = res?.result.slice(0, 5);
      }
    );
  }


  openDialog() {
    this.dialog.open(ModalPostComponent);
  }


  onFollow() {
    console.log("seguindo")
  }
}
