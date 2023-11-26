import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../interfaces/user.models";
import {UserService} from "../../../services/api/users.service";
import {PicModalComponent} from "../../profile/pic-modal/pic-modal/pic-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() profilePicture: string | undefined = '';
  @Input() displayName: string = '';
  @Input() followersCount: number = 0;
  @Input() followingsCount: number = 0;
  @Input() username: string = '';
  @Input() bio: string = '';
  @Input() postsCount: number = 0;
  @Input() posts: any;
  @Input() likedPosts: any;


  isNotFollowing: boolean = false;
  following: boolean = false;


  idUser: string = ""


  users: User[] = []




  hasData: boolean = false

  followers: [] = []

  constructor(private userService: UserService,
              public readonly dialog: MatDialog,
              public readonly service: PostService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    const urlSegments = this.route.snapshot.url;
    const userIndex = urlSegments.findIndex(segment => segment.path === 'user');


    if (userIndex !== -1 && userIndex < urlSegments.length - 1) {
      const dadoDepoisDoUser = urlSegments[userIndex + 1].path;
      this.idUser = dadoDepoisDoUser
      console.log('Dado depois de user:', dadoDepoisDoUser);
      this.hasData = true
    } else {
      console.log("não tem dados")
      this.hasData = false
    }


    console.log("aqui o id com index", this.idUser)
    this.isFollowing(this.idUser)


    this.service.profileImageChanged.subscribe((imageUrl) => {
      this.profilePicture = imageUrl;
    });


    this.getMyAllFollowers()
    this.getStatusOnBtn()
  }

  isFollowing(id: string): void {
    this.userService.getUserFollowing().subscribe(
      res => {
        console.log("os users que sigo aqui", res);

        // Verifica se o usuário com o ID fornecido está na lista de usuários seguidos
        const isFollowing = res.result.some((user: { id: any }) => user.id === id);

        // Define as variáveis para controlar a exibição dos botões
        this.isNotFollowing = !isFollowing;
        this.following = isFollowing;
      }
    );
  }



  getMyAllFollowers() {
    this.userService.getFollowingUsers().subscribe(
      res => {
        console.log("res", res)
        this.users = res?.result
      }
    )
  }

  getStatusOnBtn() {
    this.userService.getFollowingUsers().subscribe(
      res => {
        console.log("todos os usuários", res);
        const allUsers = res?.result;

        this.userService.getFollowingUsers().subscribe(
          followingUsers => {
            console.log("usuários que estou seguindo", followingUsers?.result);

            // Filtrando os usuários pra pegar só o que eu n sigo
            this.users = allUsers.map((user: User) => {
              const isFollowing = followingUsers?.result.some((followingUser: {
                id: any;
              }) => followingUser.id === user.id);
              return new User(user.id, user.email, user.profile, user.username, isFollowing);
            });

          }
        );
      }
    );
  }

  onFollow(user: User) {
    this.userService.follow(user.id).subscribe(
      res => {
        user.following = true;
        this.isFollowing(user.id); // Atualiza o estado após seguir
      }
    );
  }

  unFollow(user: User) {
    this.userService.unfollow(user.id).subscribe(
      res => {
        user.following = false;
        this.isFollowing(user.id); // Atualiza o estado após deixar de seguir
      }
    );
  }


  openDialog() {
    this.dialog.open(PicModalComponent);
  }
}
