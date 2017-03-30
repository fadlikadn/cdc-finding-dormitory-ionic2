import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { DatabaseUser } from '../../providers/database-user';
import { Page1 } from '../page1/page1';
import { HomePage } from '../home/home';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public registerForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public databaseUser: DatabaseUser,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.registerForm = formBuilder.group({
      fullname: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmpassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      access: ['', Validators.compose([Validators.required])],
    });
  }

  elementChanged(input) {
    console.log(input);
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  doRegister() {
    this.submitAttempt = true;
    // console.log(this.registerForm.value.fullname);
    // console.log(this.registerForm.value.email);
    // console.log(this.registerForm.value.password);
    // console.log(this.registerForm.value.confirmpassword);
    // console.log(this.registerForm.value.access);

    if (!this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      // let userId = this.authService.register(this.registerForm.value.email, this.registerForm.value.password).then(authService => {
      let userId = this.authService.register(this.registerForm.value.email, this.registerForm.value.password, {
        fullname: this.registerForm.value.fullname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmpassword: this.registerForm.value.confirmpassword,
        access: this.registerForm.value.access,
      }).then(authService => {
        let uservalue = {
          userid: authService,
          fullname: this.registerForm.value.fullname,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          confirmpassword: this.registerForm.value.confirmpassword,
          access: this.registerForm.value.access,
        };
        // console.log('User Value');
        // console.log(uservalue);
        // this.databaseUser.add(uservalue);

        // console.log('Auth Service');
        // console.log(authService);
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      console.log('User Id');
      console.log(userId);

      this.loading = this.loadingCtrl.create({
        // dismissOnPageChange: true,
      });
      // this.loading.present();
      this.loading.present().then(() => {
        this.loading.dismiss();
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
