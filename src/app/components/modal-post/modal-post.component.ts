import {Component} from '@angular/core';

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent {

  handleFileInput(event: any): void {
    const selectedFile = event.target.files[0];}
}
