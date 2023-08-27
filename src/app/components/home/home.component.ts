import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalPostComponent} from "../modal-post/modal-post.component";
import {PostService} from "../../post.service";
import {PostResponseModel} from "../../interfaces/post-response.models";

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

    console.log("aqui pegando o item ", localStorage.getItem('token'))

    this.service.getPostById("f8b3a4f3-bb64-407d-8a02-d27bcd8911f7").subscribe(
      (res) => {
        this.post = res
      }
    )

  }


  openDialog() {
    this.dialog.open(ModalPostComponent);
  }


}
