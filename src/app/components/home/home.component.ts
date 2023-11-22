import {PostNotificationService} from "../listeners/post-notification-service.service";

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalPostComponent} from "../modal-post/modal-post.component";
import {PostService} from "../../services/post.service";
import {getFromLocalStorage, removeToLocalStorage} from 'src/utils/local-storage.util';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";


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
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.authUser = getFromLocalStorage('me_%sesoftuni%');

    const childSegments = this.route.snapshot.children.map(segment => segment.url[0].path);

    if (childSegments.length > 0) {
      // Usar o primeiro segmento do path
      this.currentRoute = childSegments[0];
    } else {
      // Se não houver segmentos no path, definir como uma string vazia ou outro valor padrão
      this.currentRoute = '';
    }

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
