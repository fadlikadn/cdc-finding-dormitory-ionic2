import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { UserData } from '../../providers/user-data';
import { Http, Headers, RequestOptions } from '@angular/http';

import { HomePage } from '../home/home';
import { RegisterPage }  from '../register/register';
import { ResetpwdPage } from '../resetpwd/resetpwd';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public authService: AuthService,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userData: UserData,
    public http: Http) {
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.loginForm = formBuilder.group({
          // disable email validation
          // email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
          // password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
          email: [''],
          password: [''],
      });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  resetPwd() {
    this.navCtrl.push(ResetpwdPage);
  }

  loginUser() {
    this.submitAttempt = true;

    if (!this.loginForm.valid) {
        console.log(this.loginForm.value);
    } else {
        this.authService.doLoginAPI(this.loginForm.value.email, this.loginForm.value.password).then(authService => {
          console.log(authService);
          // console.log(authService._body);
          let body = JSON.parse(authService._body);
          console.log(body);
          // console.log(body.status);
          // console.log(this.userData.OK);

          if (body.status == this.userData.OK) {
              console.log(body.status);
              this.userData.loginToken(this.loginForm.value.email, body.token);
              this.loading = this.loadingCtrl.create({
                // dismissOnPageChange: true,
              });
              this.loading.present().then(() => {
                this.loading.dismiss().then(() => {

                });
              });
          } else if (body.status == this.userData.ERROR) {
              console.log(body.status);
              // do nothing
              let alert = this.alertCtrl.create({
                message: body.reason,
                buttons: [
                  {
                    text: "Ok",
                    role: "cancel"
                  }
                ]
              });
              alert.present();
          }
        }, error => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: "cancel"
                }
              ]
            });
            alert.present();
          });
        });
    }

    // login to Firebase, backup
    // if (!this.loginForm.valid) {
    //   console.log(this.loginForm.value);
    // } else {
    //   this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password).then(authService => {
    //     // this.navCtrl.setRoot(Page1);
    //     this.userData.login(this.loginForm.value.email);
    //     this.loading = this.loadingCtrl.create({
    //       dismissOnPageChange: true,
    //     });
    //     this.loading.present().then(() => {
    //       this.loading.dismiss().then(() => {
    //         // this.navCtrl.setRoot(HomePage);
    //         // this.navCtrl.push(HomePage);
    //       });
    //     });
    //   }, error => {
    //     this.loading.dismiss().then(() => {
    //       let alert = this.alertCtrl.create({
    //         message: error.message,
    //         buttons: [
    //           {
    //             text: "Ok",
    //             role: "cancel"
    //           }
    //         ]
    //       });
    //       alert.present();
    //     });
    //   });
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
