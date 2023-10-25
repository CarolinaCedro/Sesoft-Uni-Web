import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { PostService } from "../../../../post.service";
import { PostNotificationService } from "../../../listeners/post-notification-service.service";
import { removeToLocalStorage } from "../../../../../utils/local-storage.util";
import { ModalPostComponent } from "../../../modal-post/modal-post.component";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts: any = []
  likes!: number;
  coments!: number;


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
    this.service.getAllPosts(0, 100).subscribe(
      res => {
        this.posts = res?.result
      });
  }


  singOut() {
    removeToLocalStorage('token_%sesoftuni%');
  }


  openDialog() {
    this.dialog.open(ModalPostComponent);
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
