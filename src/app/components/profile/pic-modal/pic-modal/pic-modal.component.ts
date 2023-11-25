import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PostService} from "../../../../services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-pic-modal',
  templateUrl: './pic-modal.component.html',
  styleUrls: ['./pic-modal.component.scss']
})
export class PicModalComponent {

  form: FormGroup
  formData: FormData = new FormData();

  imageUrl: string | ArrayBuffer | null = null;

  @Output() fileSelected = new EventEmitter<File>();


  constructor(private fb: FormBuilder,
              private service: PostService,
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<PicModalComponent>,
  ) {
    this.form = this.fb.group({
      file: ['']
    });
  }

  onFileSelected(event: any): void {
    console.log("chegamos onde o evento chega", event.target.file[0])
    const file = event.target.files[0];
    if (file) {
      this.imageUrl = this.getSafeUrl(file);
      this.formData.append('file', file);
      this.fileSelected.emit(file);
    }

    console.log("foto selecionada", event.target.files[0])
  }

  deleteImage() {
    this.imageUrl = '';
  }

  handlePostagem(): void {
    this.formData.append('content', this.form.get('content')?.value);

    this.service.uploadProfilePicture(this.formData).subscribe(
      res => {
        this.openSnackBar('Postagem criada!');
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


  private getSafeUrl(file: File): string | ArrayBuffer | null {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    return null;
  }

}
