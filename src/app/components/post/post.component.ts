import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { formatRelativeTime } from 'src/utils/datetime.util';
import { FormBuilder, FormGroup } from '@angular/forms';

type User = {
  id: string;
  username: string;
  profile: {
    id: string;
    displayName: string;
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

  protected fakeComments = [
    {
      user: {
        username: 'user1',
        profile: {
          displayName: 'User One'
        }
      },
      content: 'Comentário falso 1'
    },
    {
      user: {
        username: 'user2',
        profile: {
          displayName: 'User Two'
        }
      },
      content: 'Comentário falso 2'
    },
    {
      user: {
        username: 'user3',
        profile: {
          displayName: 'User Three'
        }
      },
      content: 'Comentário falso 3'
    },
    {
      user: {
        username: 'user3',
        profile: {
          displayName: 'User Three'
        }
      },
      content: 'Comentário falso 3'
    },
    {
      user: {
        username: 'user3',
        profile: {
          displayName: 'User Three'
        }
      },
      content: 'Comentário falso 3'
    },
    {
      user: {
        username: 'user3',
        profile: {
          displayName: 'User Three'
        }
      },
      content: 'Comentário falso 3'
    },
    {
      user: {
        username: 'user3',
        profile: {
          displayName: 'User Three'
        }
      },
      content: 'Comentário falso 3'
    },
  ];

  form: FormGroup;
  protected loading = false;
  protected newComment: string = '';

  constructor(
    private readonly service: PostService,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      content: ['']
    });
  }

  addComment() {
    if (this.newComment.trim() !== '') {
      this.fakeComments.push({
        user: {
          username: 'usuario',
          profile: {
            displayName: 'Seu Nome',
          }
        },
        content: this.newComment
      });

      this.newComment = '';
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loading = true;
      this.service.find(id).subscribe(
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
