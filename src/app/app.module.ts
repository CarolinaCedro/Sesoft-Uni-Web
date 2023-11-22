import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { BtnGlobalComponent } from './components/utils/btn-global/btn-global.component';
import { RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { ModalPostComponent } from './components/modal-post/modal-post.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MatCardModule } from "@angular/material/card";
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PostNotificationService } from './components/listeners/post-notification-service.service';
import { SearchComponent } from './components/search/search.component';
import { FeedComponent } from "./components/home/feed/feed.component";
import { MatMenuModule } from "@angular/material/menu";
import { PostComponent } from './components/post/post.component';
import { PostCardComponent } from './components/utils/post-card/post-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoadingSpinnerComponent } from './components/utils/loading-spinner/loading-spinner.component';
import { UsersProfileComponent } from './components/users-profile/users-profile.component';
import { UserCardComponent } from './components/utils/user-card/user-card.component';
import { ColumExplorerComponent } from './components/home/colum-explorer/colum-explorer/colum-explorer.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from './components/utils/emoji/emoji.component';
import {ThemeService} from "./services/theme.service";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    BtnGlobalComponent,
    HomeComponent,
    ModalPostComponent,
    SignUpComponent,
    RegistrationFormComponent,
    ExplorerComponent,
    ProfileComponent,
    NotificationComponent,
    SettingsComponent,
    FeedComponent,
    SearchComponent,
    PostComponent,
    PostCardComponent,
    LoadingSpinnerComponent,
    UsersProfileComponent,
    UserCardComponent,
    ColumExplorerComponent,
    EmojiComponent,
  ],
  imports: [
    PickerComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule,
    FormsModule,
    MatMenuModule,
    MatTabsModule
  ],
  providers: [
    PostNotificationService,
    ThemeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
