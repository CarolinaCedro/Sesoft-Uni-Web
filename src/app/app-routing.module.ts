import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { HomeComponent } from "./components/home/home.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { autorizationGuard } from './_guard/autorization.guard';

const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "home", component: HomeComponent, canActivate: [autorizationGuard] },
  { path: "sign-up", component: SignUpComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
