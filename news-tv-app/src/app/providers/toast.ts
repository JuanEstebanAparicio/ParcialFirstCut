import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';



export interface ToastOptions {
  message: string;
  duration?: number;
  color?: string;
  position?: 'top' | 'middle' | 'bottom';
}

@Injectable({
  providedIn: 'root'
})

export class ToastService {
constructor(private toastCtrl: ToastController) { }
  
async show(message: string, opts: Omit<ToastOptions, 'message'> = {}) {
    const toast = await this.toastCtrl.create({
      message,
      duration: opts.duration ?? 2000,
      color: opts.color ?? 'primary',
      position: opts.position ?? 'bottom'
    });
    await toast.present();
  }


}
