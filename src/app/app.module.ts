import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {BtnGlobalComponent} from './components/utils/btn-global/btn-global.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from './components/home/home.component';
import {ModalPostComponent} from './components/modal-post/modal-post.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    BtnGlobalComponent,
    HomeComponent,
    ModalPostComponent,
    SignUpComponent,
    RegistrationFormComponent
  ],
    imports: [
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
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
