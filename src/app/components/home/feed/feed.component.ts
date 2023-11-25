import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PostService} from "../../../services/post.service";
import {PostNotificationService} from "../../listeners/post-notification-service.service";


export interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  repliesCount: number;
  postId: string | null;
  userId: string;
  likesCount: number;
  files: {
    url: string;
  }[];
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts: any;
  likes!: number;
  coments!: number;
  loading: boolean = false;

  constructor(
    public readonly dialog: MatDialog,
    private readonly service: PostService,
    private readonly postNotificationService: PostNotificationService,
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
}
