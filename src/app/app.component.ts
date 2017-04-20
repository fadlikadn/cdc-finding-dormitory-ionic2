import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UserListPage } from '../pages/user-list/user-list';
import { DormListPage } from '../pages/dorm-list/dorm-list';
// import { DormMapPage } from '../pages/dorm-map/dorm-map';
// import { MapSamplePage } from '../pages/map-sample/map-sample';
// import { MapJsPage } from '../pages/map-js/map-js';

import { UserData } from '../providers/user-data';
import { AuthService } from '../providers/auth-service';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon?: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public authService: AuthService;

  pages: PageInterface[] = [
    { title: 'Home Page', name: 'HomePage', component: HomePage },
    { title: 'Manage User', name:'UserListPage', component: UserListPage },
    { title: 'Manage Dorm', name:'DormListPage', component: DormListPage },
    { title: 'Logout', name: 'HomePage', component: HomePage, logsOut: true },
  ];

  // rootPage: any = HomePage;
  rootPage: any;
  // public rootPage: any;

  // pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public authServiceParams: AuthService,
    public splashScreen: SplashScreen,
    public userData: UserData,
    public menu: MenuController,
    public events: Events,
    public storage: Storage) {
    
    // firebase.auth().onAuthStateChanged(function (user) {
    //   console.log('load firebase checking');
    //   if (user) {
    //     this.rootPage = HomePage;
    //     console.log('homepage');
    //   } else {
    //     this.rootPage = LoginPage;
    //     console.log('loginpage');
    //   }
    // });
    // console.log(this.rootPage);

    this.authService = authServiceParams;

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
    console.log(this.rootPage);

    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home Page', component: HomePage },
    //   { title: 'Manage User', component: UserListPage },
    //   { title: 'Manage Dorm', component: DormListPage },
    // ];

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      console.log('is tab');
      this.nav.getActiveChildNav().select(page.index);
      // set the root of the nav with params if it's a tab index
    } else {
      console.log(page);
      console.log('no tab');
      this.nav.setRoot(page.component, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
      // this.authService.doLogout();
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.rootPage = HomePage;
      console.log('login process');
    });
    
    this.events.subscribe('user:signup', () => {
      
    });

    this.events.subscribe('user:logout', () => {
      this.rootPage = LoginPage;
      console.log('logout process');
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
