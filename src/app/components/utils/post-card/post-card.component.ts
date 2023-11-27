import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {PostService} from 'src/app/services/post.service';
import {formatRelativeTime} from 'src/utils/datetime.util';
import {PostNotificationService} from '../../listeners/post-notification-service.service';
import {getFromLocalStorage} from 'src/utils/local-storage.util';
import {Post} from '../../post/post.component';
import {FormBuilder, FormGroup} from '@angular/forms';

export interface Files {
  storage:
    {
      url: string
    }


}

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit{
  @Input() id: string = '';
  @Input() content: string = '';
  @Input() profilePicture: string | undefined = '';
  @Input() createdAt: string = '';
  @Input() updatedAt: string = '';
  @Input() userId: string = '';
  @Input() repliesCount: number = 0;
  @Input() likesCount: number = 0;
  @Input() username: string = '';
  @Input() displayName: string = '';
  @Input() liked: boolean = false;
  @Input() replies: Post[] = [];
  @Input() files: Files[] = [];

  protected authUser: any;
  form: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly snackBar: MatSnackBar,
    private postNotificationService: PostNotificationService,
    private formBuilder: FormBuilder
  ) {
    this.authUser = getFromLocalStorage('me_%sesoftuni%');
    this.form = this.formBuilder.group({
      content: [''],
      files: ['']
    });
  }

  ngOnInit(): void {
    this.postService.profileImageChanged.subscribe((imageUrl) => {
      this.profilePicture = imageUrl;
    });

  }


  formatRelativeTime(datetimePost: string) {
    return formatRelativeTime(datetimePost);
  }

  redirectToPost(event: Event) {
    const clickedElement = event.target as HTMLElement;

    // Gambiarra para ignorar os elementos clicaveis do post, desculpe pelos meus atos.
    const shouldIgnoreClick = clickedElement.classList.contains('fa-solid') ||
      clickedElement.classList.contains('mat-mdc-button-touch-target') ||
      clickedElement.classList.contains('user-avatar') ||
      clickedElement.classList.contains('display-name') ||
      clickedElement.closest('.fa-solid.fa-heart');


    if (!shouldIgnoreClick) {
      this.router.navigate(['/home/post', this.id]);
    }
  }

  redirectToUser(userId: string) {
    if (this.authUser.id == userId) {
      this.router.navigate(['/home/profile']);

      return;
    }

    this.router.navigate(['/home/user', userId]);
  }

  deletePost() {
    this.postService.deletePostById(this.id).subscribe(
      res => {
        this.openSnackBar("Postagem apagada")
        this.postNotificationService.notifyPostCreated();

      }
    )
  }

  handleLike(): void {
    try {

      if (this.liked) {
        this.unlikePost();

        return
      }

      this.likePost();
    } catch (error) {
      console.error(error);
    }
  }

  private likePost() {
    this.postService.like(this.id).subscribe(() => {
      this.likesCount++;
      this.liked = true;
    });
  }

  private unlikePost() {
    this.postService.unlike(this.id).subscribe(() => {
      this.likesCount--;
      this.liked = false;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }


}
