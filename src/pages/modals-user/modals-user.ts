import { Component } from '@angular/core';
import { NavController, ViewController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Preloader } from '../../providers/preloader';
import { DatabaseUser } from '../../providers/database-user';
import * as firebase from 'firebase';

/*
  Generated class for the ModalsUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modals-user',
  templateUrl: 'modals-user.html'
})
export class ModalsUserPage {

  public updateUserForm;
  public loading: any;
  public title: string;
  public users: any;
  // Form Value
  public userFullname: any = '';
  public userEmail: any = '';
  public userAccess: any = '';
  public userId: any = '';

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public viewCtrl: ViewController,
      public _DB: DatabaseUser,
      public _LOADER: Preloader
      ) {
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.updateUserForm = formBuilder.group({
          fullname: ['', Validators.compose([Validators.required])],
          email: ['', Validators.compose([Validators.pattern(EMAIL_REGEXP)])],
          access: ['', Validators.compose([Validators.required])],
      });
      this.title = 'Edit User';
      this.users = firebase.database().ref('users/');

      let user = navParams.get('user');
      console.log(user);
      this.userFullname = user.fullname;
      this.userEmail = user.email;
      this.userAccess = user.access;
      this.userId = user.id;
      console.log(this.userId);
  }

  saveUser(val) {
      this._LOADER.displayPreloader();

      console.log(val);
      let fullname: string = this.updateUserForm.controls["fullname"].value;
      let email: string = this.updateUserForm.controls["email"].value;
      let access: any = this.updateUserForm.controls["access"].value;

      this._DB.update(this.userId, {
          fullname: fullname,
          email: email,
          access: access,
      }).then((data) => {
          this._LOADER.hidePreloader();
      });

      this.closeModal(true);
  }

  closeModal(val = null) {
      this.viewCtrl.dismiss(val);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalsUserPage');
  }

}
