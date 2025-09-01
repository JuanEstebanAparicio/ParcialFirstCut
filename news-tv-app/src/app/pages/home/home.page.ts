import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';  
import { ToastService } from 'src/app/providers/toast';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { StorageService } from 'src/app/providers/storage';
import { NewsDetailModalComponent } from 'src/app/components/news-detail-modal/news-detail-modal.component';
import { UserMenuComponent } from 'src/app/components/user-menu/user-menu.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
articles: any[] = [];
selectedCategory: string = 'general';
categories: string[] = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
popoverCtrol: any;



  constructor(
private newsService: NewsService,
private toast: ToastService,
private navCtrl: NavController,
private storage: StorageService,
private modalCtrl: ModalController,
private popoverCtrl: PopoverController

  ) {}

 ngOnInit(){
  this.loadNews();

 }
   async openArticle(article: any) {
    const modal = await this.modalCtrl.create({
      component: NewsDetailModalComponent,
      componentProps: { article },
      cssClass: 'news-modal'
    });
    await modal.present();
  }



  loadNews() {
    this.newsService
      .getTopHeadlines(this.selectedCategory)
      .subscribe({
        next: res => (this.articles = res.articles),
        error: () => this.toast.show('Error al cargar noticias', { color: 'danger' })
      });
  }



changeCategory(cat: string) {
  this.selectedCategory = cat;
  this.loadNews();
}


logout() {
this.storage.remove('current_user');
this.navCtrl.navigateRoot('/login');
}

//Mi perfil components
async openUserMenu(ev: any) {
  const popover = await this.popoverCtrl.create({
    component: UserMenuComponent,
    event: ev,
    translucent: true
  });

  await popover.present();

  const { data } = await popover.onDidDismiss();
  if (data?.action === 'logout') this.logout();
  if (data?.action === 'edit') this.navCtrl.navigateForward('/profile');
}




}