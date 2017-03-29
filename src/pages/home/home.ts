import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

import * as firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public authService: AuthService;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authServiceParams: AuthService) {

    this.authService = authServiceParams;
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        console.log('you still haven\'t login');
        navCtrl.setRoot(LoginPage);
        // this.rootPage = LoginPage;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logout() {
    this.authService.doLogout();
  }

}
