import {PostNotificationService} from "../listeners/post-notification-service.service";

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalPostComponent} from "../modal-post/modal-post.component";
import {PostService} from "../../services/post.service";
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





  constructor(public dialog: MatDialog, private service: PostService,
              private postNotificationService: PostNotificationService,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.authUser = getFromLocalStorage('me_%sesoftuni%');
  }


  singOut() {
    removeToLocalStorage('me_%sesoftuni%');
    removeToLocalStorage('token_%sesoftuni%');
  }





  openDialog() {
    this.dialog.open(ModalPostComponent);
  }


  toogleBg() {
    document.body.classList.toggle("dark-theme")
  }
}
