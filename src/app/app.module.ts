import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';

import { HomePage } from '../pages/home/home';
import { UserListPage } from '../pages/user-list/user-list';
import { ModalsUserPage } from '../pages/modals-user/modals-user';

import { TabAroundPage } from '../pages/tab-around/tab-around';
import { TabAreaPage } from '../pages/tab-area/tab-area';

import { AroundListPage } from '../pages/around-list/around-list';
import { AroundMapPage } from '../pages/around-map/around-map';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../providers/auth-service';
import { DatabaseUser } from '../providers/database-user';
import { Preloader } from '../providers/preloader';

import { ConnectivityService } from '../providers/connectivity-service';

export const firebaseConfig = {
  apiKey: "AIzaSyAYy7LtPwxu_PB9mEqxkbp1GvMaJxB7hJA",
  authDomain: "finding-dormitory.firebaseapp.com",
  databaseURL: "https://finding-dormitory.firebaseio.com",
  storageBucket: "finding-dormitory.appspot.com",
  messagingSenderId: "174948481698"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    UserListPage,
    ModalsUserPage,
    TabAroundPage,
    TabAreaPage,
    AroundListPage,
    AroundMapPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    UserListPage,
    ModalsUserPage,
    TabAroundPage,
    TabAreaPage,
    AroundListPage,
    AroundMapPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DatabaseUser,
    Preloader,
    ConnectivityService
  ]
})
export class AppModule {}
