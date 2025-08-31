import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-news-detail-modal',
  templateUrl: './news-detail-modal.component.html',
  styleUrls: ['./news-detail-modal.component.scss'],
})
export class NewsDetailModalComponent {
  @Input() article: any;

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }

  openOriginal() {
    window.open(this.article.url, '_blank');
  }
}