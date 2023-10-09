import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalPostComponent} from "../modal-post/modal-post.component";
import {PostService} from "../../post.service";
import {PostNotificationService} from "../listeners/post-notification-service.service";

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

    console.log("aqui pegando o item ", localStorage.getItem('token'))

    this.service.getAllPosts(0, 100).subscribe(
      (res) => {
        this.posts = res.result;
      }
    )

    this.postNotificationService.postCreated$.subscribe(() => {
      // Atualiza a lista de postagens
      this.service.getAllPosts(0, 100).subscribe(
        (res) => {
          this.posts = res.result;
        }
      );
    });

    console.log("aqui esta merda", this.posts)

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
