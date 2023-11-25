import {Component, EventEmitter, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-upload-dialog-content',
  templateUrl: './upload-dialog-content.component.html',
  styleUrls: ['./upload-dialog-content.component.scss']
})
export class UploadDialogContentComponent {

  title = 'angular-image-uploader';

  imageChangedEvent: any = '';
  croppedImage: any = '';

  imageUrl: string | ArrayBuffer | null = null;

  @Output() fileSelected = new EventEmitter<File>();

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageUrl = this.getSafeUrl(file);
      this.fileSelected.emit(file);
    }
  }


  private getSafeUrl(file: File): string | ArrayBuffer | null {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    return null;
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

}
