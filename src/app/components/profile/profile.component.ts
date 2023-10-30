import { Component, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/api/users.service';

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  postsCount: number;
  followingsCount: number;
  followersCount: number;
  profile: {
    id: string;
    displayName: string;
    bio: string | null;
    websiteUrl: string | null;
    createdAt: string;
    updatedAt: string;
    iconStorageId: string | null;
    icon: UserIconProps;
  };
}

type UserIconProps = {
  id: string;
  url?: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  activeTab: string = 'postagens';
  loading: boolean = false;
  user: UserProfile = {} as UserProfile;

  constructor(
    private readonly renderer: Renderer2,
    private readonly service: UserService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.service.getMe().subscribe(
      res => {
        this.user = res;
        this.loading = false;
      });
  }

  switchTab(tab: string) {
    this.activeTab = tab;

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach((button) => {
      this.renderer.removeClass(button, 'active');
    });
    const activeButton = document.querySelector(`[data-tab=${tab}]`);
    this.renderer.addClass(activeButton, 'active');

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach((content) => {
      this.renderer.removeClass(content, 'active');
    });
    const activeContent = document.querySelector(`#${tab}`);
    this.renderer.addClass(activeContent, 'active');
  }
}
