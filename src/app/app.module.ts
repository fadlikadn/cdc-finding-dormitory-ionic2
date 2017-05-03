import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';  
import { HomePage } from '../pages/home/home';
import { UserListPage } from '../pages/user-list/user-list';
import { ModalsUserPage } from '../pages/modals-user/modals-user';
import { DormListPage } from '../pages/dorm-list/dorm-list';
import { ModalsDormPage } from '../pages/modals-dorm/modals-dorm';
import { DormDetailPage } from '../pages/dorm-detail/dorm-detail';
import { TabAroundPage } from '../pages/tab-around/tab-around';
import { TabAreaPage } from '../pages/tab-area/tab-area';
import { AroundListPage } from '../pages/around-list/around-list';
import { AroundMapPage } from '../pages/around-map/around-map';
import { DormFilterPage } from '../pages/dorm-filter/dorm-filter';
import { MapSamplePage } from '../pages/map-sample/map-sample';
// import { DormMapPage } from '../pages/dorm-map/dorm-map';
// import { MapJsPage } from '../pages/map-js/map-js';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

// Provider
import { AuthService } from '../providers/auth-service';
import { DatabaseUser } from '../providers/database-user';
import { DatabaseDorm } from '../providers/database-dorm';
import { Preloader } from '../providers/preloader';
import { Image } from '../providers/image';
import { Toast } from '../providers/toast';
import { ConnectivityService } from '../providers/connectivity-service';
import { UserData }from '../providers/user-data';
import { DormService } from '../providers/dorm-service';

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
    HomePage,
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    UserListPage,
    ModalsUserPage,
    DormListPage,
    ModalsDormPage,
    TabAroundPage,
    TabAreaPage,
    AroundListPage,
    AroundMapPage,
    MapSamplePage,
    DormDetailPage,
    DormFilterPage,
    // DormMapPage,
    // MapJsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      menuType: 'push',
      links: [
        { component: HomePage, name: 'Home', segment: 'home'},
        { component: UserListPage, name: 'UserList', segment: 'userList'},
        { component: DormListPage, name: 'DormList', segment: 'dormList'},
      ]
    }, {}),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    UserListPage,
    ModalsUserPage,
    DormListPage,
    ModalsDormPage,
    TabAroundPage,
    TabAreaPage,
    AroundListPage,
    AroundMapPage,
    MapSamplePage,
    DormDetailPage,
    DormFilterPage,
    // DormMapPage,
    // MapJsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DatabaseUser,
    DatabaseDorm,
    Preloader,
    ConnectivityService,
    Image,
    Toast,
    UserData,
    Geolocation,
    NativeGeocoder,
    DormService,
    // InAppBrowser,
  ]
})
export class AppModule {}
