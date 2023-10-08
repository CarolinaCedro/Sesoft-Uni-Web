import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SesoftService } from "../../sesoft.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup
  errorLogin!: boolean;
  isValidationInProgress = false;


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
      return this.viewPage = false;
    }

    return this.viewPage = true
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  autentication(form: FormGroup) {
    if (form.valid) {
      this.isValidationInProgress = true;

      this.service.login(form.value).subscribe(
        () => {
          this.isValidationInProgress = false;
          this.errorLogin = false;
        },
        (error: any) => {
          console.log("Erro ao fazer login:", error);
          this.isValidationInProgress = false;
          this.errorLogin = true;
        }
      );
    }
  }

}
