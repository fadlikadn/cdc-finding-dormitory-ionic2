import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import * as firebase from 'firebase';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController) {
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (!user) {
    //     console.log('you still haven\'t login');
    //     navCtrl.setRoot(LoginPage);
    //     // this.rootPage = LoginPage;
    //   }
    // });
  }

}
