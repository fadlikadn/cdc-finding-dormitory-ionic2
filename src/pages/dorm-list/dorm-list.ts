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
import 'rxjs/add/operator/map';
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
  // public dormRef: any;
  // public dormList: any;
  public loadedDormList: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _DB: DatabaseDorm,
    private platform: Platform,
    private _LOADER: Preloader,
    private modalCtrl: ModalController,
    public authServiceParams: AuthService) {
    // disable firebase auth
    // firebase.auth().onAuthStateChanged(function (user) {
    //   if (!user) {
    //     navCtrl.setRoot(LoginPage);
    //   }
    // });
    this.searchControl = new FormControl();
    this.authService = authServiceParams;
    // this.dormList = this._DB.render2();
    this.loadedDormList = this._DB.render2();
  }

  initializeItems(): void {
    this.dorms = this.loadedDormList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    console.log(q);

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    // console.log(this.dorms);
    // this.dorms = this.dorms.map(_dorms => _dorms.filter(dorm => dorm.name == q));
    this.dorms = this.dorms.map(_dorms => _dorms.filter(dorm => dorm.name.toLowerCase().indexOf(q.toLowerCase()) >= 0));
  }

  ionViewDidEnter() {
    this._LOADER.displayPreloader();
    this.platform.ready().then(() => {
      this.loadAndParseDorms();
    });
  }

  loadAndParseDorms() {
    this.dorms = this._DB.render2();
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
    let params = { dorm: dorm, isEdited: true };
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

  deleteDorm(dorm) {
    this._LOADER.displayPreloader();
    this._DB.delete2(dorm.$key).then((data) => {
        this.loadAndParseDorms();
    });
  }

  logout() {
    this.authService.doLogout();
  }

}
