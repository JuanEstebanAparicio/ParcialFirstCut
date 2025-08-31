import { Component,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false
})
export class NewDetailsModalComponents {
@Input() article: any;
  constructor(private modalCtrl: ModalController) { }

  close(){
    this.modalCtrl.dismiss();
  }

  openOriginal(){
    window.open(this.article.url, '_blank');
  }


}
