import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  router = inject(Router);
  toastCtrl = inject(ToastController);
  loagingCtrl = inject(LoadingController);

  routerLink(url: any){
    this.router.navigateByUrl(url)
  }

  loading(){
    return this.loagingCtrl.create({
      spinner: 'crescent'
    })
  }

  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
}
