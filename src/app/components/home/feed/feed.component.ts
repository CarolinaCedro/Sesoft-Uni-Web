import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PostService} from "../../../post.service";
import {PostNotificationService} from "../../listeners/post-notification-service.service";
import {removeToLocalStorage} from "../../../../utils/local-storage.util";
import {ModalPostComponent} from "../../modal-post/modal-post.component";
import {formatRelativeTime} from 'src/utils/datetime.util';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts: any = []
  likes!: number;
  coments!: number;
  loading: boolean = false;


  constructor(
    public readonly dialog: MatDialog,
    private readonly service: PostService,
    private readonly postNotificationService: PostNotificationService
  ) {
  }

  ngOnInit(): void {
    this.getPosts();
    this.listenerWhenPostWasCreated();
  }

  private listenerWhenPostWasCreated() {
    this.postNotificationService.postCreated$.subscribe(() => {
      this.getPosts();
    });
  }

  private getPosts() {
    this.loading = true;
    this.service.getAllPosts(0, 100).subscribe(
      res => {
        this.posts = res?.result
        this.loading = false;
      });
  }

  formatRelativeTime(datetimePost: string) {
    return formatRelativeTime(datetimePost);
  }

  singOut() {
    removeToLocalStorage('token_%sesoftuni%');
  }


  openDialog() {
    this.dialog.open(ModalPostComponent);
  }

  deletePostById(id: string) {
    this.service.deletePostById(id).subscribe(
      res => {
        console.log("o post foi excluido", res)
      }
    )
  }

  handleLike(postId: string): void {
    try {
      const postLiked = this.posts.find((post: any) => post.id === postId);

      if (!postLiked) return;

      if (postLiked.liked) {
        this.unlikePost(postLiked);

        return
      }

      this.likePost(postLiked);
    } catch (error) {
      console.error(error);
    }
  }

  private likePost(post: any) {
    this.service.like(post.id).subscribe(() => {
      post.likesCount++;
      post.liked = true;
    });
  }

  private unlikePost(post: any) {
    this.service.unlike(post.id).subscribe(() => {
      post.likesCount--;
      post.liked = false;
    });
  }

  handleComents() {
    this.coments = +1
    console.log("comentando")
  }

}
