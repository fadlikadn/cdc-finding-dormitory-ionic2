import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthService } from '../../providers/auth-service';
import { DatabaseUser } from '../../providers/database-user';
import { Preloader } from '../../providers/preloader';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

import { LoginPage } from '../login/login';
import { ModalsUserPage } from '../modals-user/modals-user';

/*
  Generated class for the UserList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html'
})
export class UserListPage {

  public users: any;
  // public usersMap: any;
  // public loadedUsers: any;
  public searchTerm: string = '';
  public searchControl: FormControl;
  public authService: AuthService;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public databaseUser: DatabaseUser,
    private platform: Platform,
    private _LOADER: Preloader,
    private modalCtrl: ModalController,
    public authServiceParams: AuthService) {

    firebase.auth().onAuthStateChanged(function(user) {
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
      this.loadAndParseUsers();
    });
  }

  loadAndParseUsers() {
    this.users = this.databaseUser.render();
    // this.users = this.databaseUser.renderPromise();
    console.log(this.users);
    // this.loadedUsers = this.users;
    
    this._LOADER.hidePreloader();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');
  }

  filterUsers() {
    console.log(this.users);
    // put filter logic here
  }

  editUser(user) {
    let params = { user: user };
    let modal = this.modalCtrl.create(ModalsUserPage, params);

    modal.onDidDismiss((data) => {
      if (data) {
          this._LOADER.displayPreloader();
          this.loadAndParseUsers();
          console.log('edit user dismissed');
      }
    });
    modal.present();
  }

  logout() {
    this.authService.doLogout();
  }

}
