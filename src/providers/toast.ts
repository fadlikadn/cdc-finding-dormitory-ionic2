import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Toast provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Toast {

  constructor(
    public http: Http,
    public toastCtrl: ToastController) {
    // console.log('Hello Toast Provider');
  }

  showToastFailed() {
    let toast = this.toastCtrl.create({
      message: 'Dormitory not found!',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

}
