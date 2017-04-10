import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { UserListPage } from '../pages/user-list/user-list';
import { DormListPage } from '../pages/dorm-list/dorm-list';
// import { DormMapPage } from '../pages/dorm-map/dorm-map';
// import { MapSamplePage } from '../pages/map-sample/map-sample';
// import { MapJsPage } from '../pages/map-js/map-js';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = Page1;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home Page', component: HomePage },
      // { title: 'Dorm Map', component: DormMapPage },
      // { title: 'Dorm Map', component: DormMapPage },
      // { title: 'Page One', component: Page1 },
      // { title: 'Page Two', component: Page2 },
      { title: 'Manage User', component: UserListPage },
      { title: 'Manage Dorm', component: DormListPage },
      // { title: 'Map Sample', component: MapSamplePage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (!user) {
    //     console.log('you still haven\'t login');
    //     // this.nav.setRoot(LoginPage);
    //     // this.rootPage = LoginPage;
    //   }
    // })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
