import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {PicModalComponent} from "../pic-modal/pic-modal/pic-modal.component";
import {ProfileImageService} from "../../../services/profile-image.service";

@Component({
  selector: 'app-upload-dialog-content',
  templateUrl: './upload-dialog-content.component.html',
  styleUrls: ['./upload-dialog-content.component.scss']
})
export class UploadDialogContentComponent {

  title = 'angular-image-uploader';

  imageUrl: string = '';
  hasImage: boolean = false;
  showBtn: boolean = false;
  hiddenBtn: boolean = true;
  formData: FormData = new FormData();

  @Output() fileSelected = new EventEmitter<File>();


  constructor(private service: PostService,
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<PicModalComponent>,
              private profileImageService: ProfileImageService,
              private cdRef: ChangeDetectorRef
  ) {
  }

  onFileSelected(event: any): void {
    console.log("chegando aqui", event.target.files[0])
    const file: File = event.target.files[0];

    if (file) {
      this.formData.append('file', file);

      this.imageUrl = URL.createObjectURL(file);
      this.hasImage = true;
      this.showBtn = true;
      this.hiddenBtn = false;


    }

  }

  submit() {
    this.uploadProfilePicture();
  }

  private uploadProfilePicture(): void {
    this.service.uploadProfilePicture(this.formData).subscribe(
      (response) => {
        this.openSnackBar('Foto atualizada com sucesso!');
        this.dialogRef.close('close');

        const newImageUrl = response?.profile?.icon?.url;


        // // Notifique sobre a mudança da imagem do perfil usando o serviço existente
        // this.profileImageService.notifyProfileImageChanged(newImageUrl);

        // Forçar detecção de mudanças manualmente
        this.cdRef.detectChanges();

        console.log(response, "upload feito");
      },
      (error) => {
        console.error('Erro ao atualizar a foto de perfil:', error);
      }
    );
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }




}
