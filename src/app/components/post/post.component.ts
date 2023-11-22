import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { formatRelativeTime } from 'src/utils/datetime.util';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/api/users.service';

type User = {
  id: string;
  username: string;
  profile: {
    id: string;
    displayName: string;
    icon?: any;
  };
}

type File = {
  storage: {
    url: string;
  };
}

export type Post = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  repliesCount: number;
  postId: string | null;
  userId: string;
  likesCount: number;
  user: User;
  replies: Post[];
  userLiked: boolean;
  files: File[];
}

@Component({
  selector: 'app-notification',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  protected post = {} as Post;

  user: any;


  form: FormGroup;
  protected loading = false;
  protected newComment: string = '';
  public postId: string = '';

  constructor(
    private readonly service: PostService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      content: ['']
    });

    this.userService.getMe().subscribe(
      res => {
        this.user = res;
      });
  }

  addComment(): void {
    const formData = this.form.value;

    console.log(this.user);

    this.service.reply(this.postId, formData.content).subscribe(
      reponse => {
        return this.post.replies.push({
          content: formData.content,
          id: reponse.id,
          createdAt: reponse.createdAt,
          updatedAt: '',
          repliesCount: 0,
          postId: null,
          userId: '',
          likesCount: 0,
          user: {
            id: '',
            username: this.user.username,
            profile: {
              id: this.user.id,
              displayName: this.user.profile.displayName,
              icon: undefined
            }
          },
          replies: [],
          userLiked: false,
          files: []
        });
      }
    );

    this.form.reset();
  }
  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.postId) {
      this.loading = true;
      this.service.find(this.postId).subscribe(
        res => {
          this.post = res;
          this.loading = false;
        },
        error => {
          console.error('Erro ao buscar post:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('ID não encontrado na URL.');
    }
  }

  commentOnPost() { }

  formatRelativeTime(datetimePost: string) {
    return formatRelativeTime(datetimePost);
  }

  handleLike(postId: string): void {
    try {
      const postLiked = this.post;

      if (!postLiked) return;

      if (postLiked.userLiked) {
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
      post.userLiked = true;
    });
  }

  private unlikePost(post: any) {
    this.service.unlike(post.id).subscribe(() => {
      post.likesCount--;
      post.userLiked = false;
    });
  }
}
