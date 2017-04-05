import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthService } from '../../providers/auth-service';
import { DatabaseDorm } from '../../providers/database-dorm';
import { Preloader } from '../../providers/preloader';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

import { LoginPage } from '../login/login';
import { ModalsDormPage } from '../modals-dorm/modals-dorm';

/*
  Generated class for the DormList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dorm-list',
  templateUrl: 'dorm-list.html'
})
export class DormListPage {

  public dorms: any;
  public searchTerm: string = '';
  public searchControl: FormControl;
  public authService: AuthService;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public databaseDorm: DatabaseDorm,
    private platform: Platform,
    private _LOADER: Preloader,
    private modalCtrl: ModalController,
    public authServiceParams: AuthService) {
      
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        navCtrl.setRoot(LoginPage);
      }
    });
    this.searchControl = new FormControl();
    this.authService = authServiceParams;
  }

  ionViewDidEnter() {
    this._LOADER.displayPreloader();
    this.platform.ready().then(() => {
      this.loadAndParseDorms();
    });
  }

  loadAndParseDorms() {
    this.dorms = this.databaseDorm.render();
    console.log(this.dorms);

    this._LOADER.hidePreloader();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DormListPage');
  }

  filterDorms() {
    console.log(this.dorms);
  }

  addDorm() {
    let modal = this.modalCtrl.create(ModalsDormPage);
    modal.onDidDismiss((data) => {
      if (data) {
        this._LOADER.displayPreloader();
        this.loadAndParseDorms();
      }
    });
    modal.present();
  }

  editDorm(dorm) {
    let params = { dorm: dorm };
    let modal = this.modalCtrl.create(ModalsDormPage, params);

    modal.onDidDismiss((data) => {
      if (data) {
        this._LOADER.displayPreloader();
        this.loadAndParseDorms();
        console.log('edit dorm dismissed');
      }
    });
    modal.present();
  }

  logout() {
    this.authService.doLogout();
  }

}
