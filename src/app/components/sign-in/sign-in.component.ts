import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SesoftService} from "../../sesoft.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  //  "displayName": "string",
  //   "username": "string",
  //   "email": "string",
  //   "password": "string"

  form: FormGroup
  errorLogin!: boolean;


  public viewPage!: boolean

  constructor(private router: Router, private service: SesoftService, private _snackBar: MatSnackBar, private builder: FormBuilder) {
    this.form = builder.group({
      email: ["", Validators.email],
      password: [""]
    })
  }

  ngOnInit(): void {
    this.viewPage = true
    this.errorLogin = false;
  }

  body = {
    // displayName: "admin",
    // username: "owner2",
    // email: "owner2admin@email.com",
    // password: "3498cedro"
  }


  registerUser() {
    console.log("passando pelo metodo")
    this.service.signUp(this.body).subscribe(
      response => {
        console.log(response)
        this.openSnackBar("Usuário criado com sucesso !", "Fechar")
      }, error => {
        this.openSnackBar("Errou ao criar usuário !", "Fechar")
      }
    )
  }

  changeState() {
    if (this.viewPage) {
      this.viewPage = false;
    } else {
      this.viewPage = true
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  autentication(form: FormGroup) {
    this.service.login(form.value).subscribe(
      (response) => {
        const token = response.text; // Armazena o token JWT
        this.errorLogin = false
        console.log(token)
        // Armazene o token em localStorage ou sessionStorage
      },
      (error) => {
        console.log("Erro ao fazer login:", error);
        this.errorLogin = true
      }
    );
  }
}
