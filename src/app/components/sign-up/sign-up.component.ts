import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public viewPage!: boolean

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.viewPage = true
  }


  autentication() {
    this.router.navigate(['/home'])
  }


}
