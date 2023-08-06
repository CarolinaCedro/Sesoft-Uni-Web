import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-btn-global',
  templateUrl: './btn-global.component.html',
  styleUrls: ['./btn-global.component.scss']
})
export class BtnGlobalComponent {

  @Input() titleButton = 'Titulo default'
  @Input() buttonWidth!: string;

  @Input() buttonPadding!: string;



}
