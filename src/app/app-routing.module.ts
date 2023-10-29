import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { HomeComponent } from "./components/home/home.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { autorizationGuard } from './_guard/autorization.guard';
import { ExplorerComponent } from "./components/explorer/explorer.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { FeedComponent } from "./components/home/feed/feed.component";
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: "", component: SignInComponent },
  {
    path: "home", component: HomeComponent,
    canActivate: [autorizationGuard],
    children: [
      {
        path: "feed",
        component: FeedComponent
      },
      {
        path: "explorer",
        component: ExplorerComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "notification",
        component: NotificationComponent
      },
      {
        path: "settings",
        component: SettingsComponent
      },
      {
        path: "search",
        component: SearchComponent
      }
    ]
  },
  { path: "sign-up", component: SignUpComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
