import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PostService} from "../../../../post.service";
import {PostNotificationService} from "../../../listeners/post-notification-service.service";
import {removeToLocalStorage} from "../../../../../utils/local-storage.util";
import {ModalPostComponent} from "../../../modal-post/modal-post.component";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {


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
        console.log("teste", res)
        this.posts = res?.result
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
