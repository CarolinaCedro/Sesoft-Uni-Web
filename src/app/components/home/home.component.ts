import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ModalPostComponent } from "../modal-post/modal-post.component";
import { PostService } from "../../post.service";
import { PostResponseModel } from "../../interfaces/post-response.models";
import { removeToLocalStorage } from 'src/utils/local-storage.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // posts: Array<PostResponseModel> = []
  post: PostResponseModel = {}


  constructor(public dialog: MatDialog, private service: PostService) {
  }

  ngOnInit(): void {
    this.service.getPostById("f8b3a4f3-bb64-407d-8a02-d27bcd8911f7").subscribe(
      (res) => {
        this.post = res
      }
    )
  }

  protected singOut() {
    removeToLocalStorage('token_%sesoftuni%');
  }


  openDialog() {
    this.dialog.open(ModalPostComponent);
  }


}
