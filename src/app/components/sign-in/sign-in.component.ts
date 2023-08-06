import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {


  constructor(private router: Router) {
  }

  autentication() {
   this.router.navigate(['/home'])
  }
}
