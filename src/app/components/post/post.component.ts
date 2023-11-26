import {Component, OnInit} from '@angular/core';
import {PostService} from 'src/app/services/post.service';
import {ActivatedRoute} from '@angular/router';
import {formatRelativeTime} from 'src/utils/datetime.util';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from 'src/app/services/api/users.service';

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
  userResponse = {} as User


  form: FormGroup;
  protected loading = false;
  protected newComment: string = '';
  public postId: string = '';

  picProfile: string = '';
  picProfileComent: string = ''


  userId: string = ""


  constructor(
    private readonly service: PostService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      content: ['']
    });



  }



  ngOnInit(): void {

    this.getMe()

    this.service.profileImageChanged.subscribe((imageUrl) => {
      this.picProfile = imageUrl;
    });



    this.postId = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.postId) {
      this.loading = true;
      this.service.find(this.postId).subscribe(
        res => {
          console.log("teste lula", res)
          console.log("res user", res.user)
          this.post = res;
          this.userId = res.user.id
          console.log("res id", this.userId)
          this.picProfile = res.user?.profile?.icon?.url
          // this.picProfileComent = this.user?.profile?.icon?.url
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

    console.log("id", this.userId)

  }

  getMe(){
    this.userService.getMe().subscribe(
      res => {
        this.user = res;
        this.userResponse = res
      });
  }


  addComment(): void {
    const formData = this.form.value;

    console.log("oque é isso", this.user);

    this.service.reply(this.postId, formData.content).subscribe(
      reponse => {
        this.post.replies.push({
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
              icon: this.userResponse.profile.icon.url
            }
          },
          replies: [],
          userLiked: false,
          files: []
        });

        // Move a atribuição para dentro do bloco subscribe
        this.picProfileComent = this.userResponse.profile?.icon?.url;
      }
    );

    this.form.reset();
  }



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
