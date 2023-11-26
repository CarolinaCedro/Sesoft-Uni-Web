import {Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SesoftService} from 'src/app/services/sesoft.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  form: FormGroup = new FormGroup({});

  constructor(private service: SesoftService, private _snackBar: MatSnackBar,
              private builder: FormBuilder,
              private route: Router
  ) {
    this.form = this.builder.group({
      email: ["", Validators.required, Validators.email],
      username: ["", Validators.required,],
      password: ["", Validators.required,],
      displayName: ["", Validators.required,],
    })
  }

  registerUser() {
    this.service.signUp(this.form.value).subscribe(
      (response: any) => {
        console.log(response)
        window.location.reload();
        this.openSnackBar("Usuário criado com sucesso !", "Fechar")
      }, () => {
        this.openSnackBar("Errou ao criar usuário !", "Fechar")
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
