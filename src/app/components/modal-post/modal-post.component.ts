import { Component, OnInit } from '@angular/core';
import { PostService } from "../../post.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";
import { PostNotificationService } from "../listeners/post-notification-service.service";

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent implements OnInit {
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private service: PostService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalPostComponent>,
    private postNotificationService: PostNotificationService
  ) {
    this.form = this.fb.group({
      content: ['', new Validators]
    });
  }

  handleFileInput(event: any): void {
    const selectedFile = event.target.files[0];
  }


  ngOnInit(): void {
  }

  handlePostagem(form: FormGroup) {
    this.service.createPost(form.value).subscribe(
      res => {
        this.openSnackBar("Postagem criada !")
        this.postNotificationService.notifyPostCreated();
        this.dialogRef.close("close")
      }, error => {
        this.openSnackBar(error)
      }
    )
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
