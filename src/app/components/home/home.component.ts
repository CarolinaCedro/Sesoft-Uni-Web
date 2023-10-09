import {PostNotificationService} from "../listeners/post-notification-service.service";

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalPostComponent} from "../modal-post/modal-post.component";
import {PostService} from "../../post.service";
import {removeToLocalStorage} from 'src/utils/local-storage.util';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // posts: Array<PostResponseModel> = []
  posts: any = []
  likes!: number;
  coments!: number;


  constructor(public dialog: MatDialog, private service: PostService,
              private postNotificationService: PostNotificationService
  ) {
  }

  ngOnInit(): void {
    this.service.getAllPosts(0, 100).subscribe(
      res => {
        console.log(res)
        this.posts = res
      })
  }


  singOut() {
    removeToLocalStorage('token_%sesoftuni%');
  }


  openDialog() {
    this.dialog.open(ModalPostComponent);
  }


  handleLike() {
    this.likes = +1
    console.log("clicando")
  }

  handleComents() {
    this.coments = +1
    console.log("comentando")
  }
}
