import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';  
import { ToastService } from 'src/app/providers/toast';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/providers/storage';
import { NewsDetailModalComponent } from 'src/app/components/news-detail-modal/news-detail-modal.component';

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



  constructor(
private newsService: NewsService,
private toast: ToastService,
private navCtrl: NavController,
private storage: StorageService,
  ) {}

 ngOnInit(){

 }


 


loadNews() {
  const category = this.selectedCategory || undefined;
  this.newsService.getTopHeadlines(category).subscribe({
    next: res => this.articles = res.articles,
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
}