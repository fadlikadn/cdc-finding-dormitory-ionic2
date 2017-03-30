import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthService } from '../../providers/auth-service';
import { DatabaseUser } from '../../providers/database-user';
import { Preloader } from '../../providers/preloader';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

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
  public loadedUsers: any;
  public searchTerm: string = '';
  public searchControl: FormControl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public databaseUser: DatabaseUser,
    private platform: Platform,
    private _LOADER: Preloader) {
    this.searchControl = new FormControl();
  }

  ionViewDidEnter() {
    this._LOADER.displayPreloader();
    this.platform.ready().then(() => {
      this.loadAndParseUsers();
    });
  }

  loadAndParseUsers() {
    this.users = this.databaseUser.render();
    this.loadedUsers = this.users;
    
    this._LOADER.hidePreloader();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');
  }

}
