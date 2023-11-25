import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-pic-modal',
  templateUrl: './pic-modal.component.html',
  styleUrls: ['./pic-modal.component.scss']
})
export class PicModalComponent {

  imageUrl: string | ArrayBuffer | null = null;

  @Output() fileSelected = new EventEmitter<File>();

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    console.log("o file escolhido",event.target.files[0])
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

}
