import {PostNotificationService} from "../listeners/post-notification-service.service";

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalPostComponent} from "../modal-post/modal-post.component";
import {PostService} from "../../services/post.service";
import {getFromLocalStorage, removeToLocalStorage} from 'src/utils/local-storage.util';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {SesoftService} from "../../services/sesoft.service";


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

  currentRoute: string = ''


  constructor(public dialog: MatDialog, private service: PostService,
              private postNotificationService: PostNotificationService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private sesoftService: SesoftService
  ) {
  }

  ngOnInit(): void {
    this.sesoftService.getUser().subscribe(
      res => {
        console.log("aqio o user", res),
          this.authUser = res
      }
    )
    this.authUser = getFromLocalStorage('me_%sesoftuni%');

    const childSegments = this.route.snapshot.children.map(segment => segment.url[0].path);


    console.log(this.currentRoute);

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
