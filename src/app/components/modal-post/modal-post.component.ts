import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {PostNotificationService} from "../listeners/post-notification-service.service";

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent implements OnInit {

  form: FormGroup
  formData: FormData = new FormData();


  file!: any


  isFile: boolean = false
  fileName: string = '';
  showCardEmoji: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: PostService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalPostComponent>,
    private postNotificationService: PostNotificationService
  ) {
    this.form = this.fb.group({
      content: ['', new Validators],
      files: ['']
    });
  }

  ngOnInit(): void {
  }

  handleFileInput(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.isFile = true
      this.fileName = event.target.files[0].name;
      console.log("aqui o arquivo", event.target.files[0])
      this.formData.append('files', selectedFile);


    }

    // if (selectedFile) {
    //   console.log('Arquivo selecionado:', selectedFile);
    //   console.log('FormData:', this.formData);
    // }
  }

  deleteImage() {
    this.fileName = '';
    this.isFile = false
  }

  handlePostagem(): void {
    this.formData.append('content', this.form.get('content')?.value);

    this.service.createPost(this.formData).subscribe(
      res => {
        this.openSnackBar('Postagem criada!');
        this.postNotificationService.notifyPostCreated();
        this.dialogRef.close('close');
      },
      error => {
        this.openSnackBar(error);
      }
    );

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  openCarEmoji() {
    this.showCardEmoji = !this.showCardEmoji;
  }

  emoji($event: any) {
    console.log("emoki", $event)
    const emojiValue = $event.emoji.native;
    const contentControl = this.form.get('content');

    if (contentControl) {
      contentControl.setValue(`${contentControl.value || ''} ${emojiValue}`);
    }

    this.showCardEmoji = false;
  }


}
