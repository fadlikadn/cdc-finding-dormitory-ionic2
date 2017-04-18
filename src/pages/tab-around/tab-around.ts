import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthService } from '../../providers/auth-service';
import { DatabaseDorm } from '../../providers/database-dorm';
import { Preloader } from '../../providers/preloader';
import { Toast } from '../../providers/toast';
import * as firebase from 'firebase';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import { LoginPage } from '../login/login';
import { DormDetailPage } from '../dorm-detail/dorm-detail';
import { DormFilterPage } from '../dorm-filter/dorm-filter';

// import { AroundListPage } from '../around-list/around-list';
// import { AroundMapPage } from '../around-map/around-map';

/*
  Generated class for the TabAround page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

// declare var google;

@Component({
  selector: 'page-tab-around',
  templateUrl: 'tab-around.html'
})
export class TabAroundPage {

  public dorms: any;
  public dormsTemp: any;
  public searchTerm: string = '';
  public searchControl: FormControl;
  public authService: AuthService;
  public loadedDormList: any;
  public dorm: string = '';
  public coords: any;
  public isActive: boolean = false;
  public around = 'list';
  public filterParams: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public _DBDorm: DatabaseDorm,
    public _LOADER: Preloader,
    public _TOAST: Toast,
    public modalCtrl: ModalController,
    public authServiceParams: AuthService
    ) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          navCtrl.setRoot(LoginPage);
        }
      });
      this.searchControl = new FormControl();
      this.authService = authServiceParams;
      this.loadedDormList = this._DBDorm.render2();
    }

  initializeItems(): void {
    this.dorms = this.loadedDormList;
  }

  getItems(searchbar) {
    this.initializeItems();

    var q = searchbar.srcElement.value;

    if (!q) {
      return;
    }

    this.dorms = this.dorms.map(_dorms => _dorms.filter(dorm => dorm.name.toLowerCase().indexOf(q.toLowerCase()) >= 0));
  }

  ionViewDidEnter() {
    this._LOADER.displayPreloader();
    this.platform.ready().then(() =>  {
      this.loadAndParseDorms();
    });
  }

  loadAndParseDorms() {
    this.dorms = this._DBDorm.render2();

    this._LOADER.hidePreloader();
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad TabAroundPage');
  }

  gotoDormDetail(dormData: any) {
    let params = { dorm: dormData };
    let modal = this.modalCtrl.create(DormDetailPage, params);

    modal.onDidDismiss((data) => {
      if (data) {
        this._LOADER.displayPreloader();
        this.loadAndParseDorms();
      }
    });
    modal.present();
  }

  showFilter() {
    let params = { params: this.filterParams };
    let modal = this.modalCtrl.create(DormFilterPage, params);

    modal.onDidDismiss((data) => {
      if (data) {
        this.filterParams = data;
        this._LOADER.displayPreloader();
        // query dorm by selected filter
        if (data.gender !== undefined) {
            this.dorms = this._DBDorm.render2();
            if (data.gender !== '') {
                // console.log('search by gender');
                this.dorms = this.dorms.map(_dorms => _dorms.filter(dorm => dorm.gender == data.gender));
                // console.log(this.dorms);
            }

            if (data.period !== '') {
                // console.log('search by period');
                this.dorms = this.dorms.map(_dorms => _dorms.filter(dorm => dorm.period == data.period));
                // console.log(this.dorms);
            }

            if (data.minPrice !== '') {
                this.dorms = this.dorms.map(_dorms => _dorms.filter(dorm => parseInt(dorm.price) >= parseInt(data.minPrice) ));
            }

            if (data.maxPrice !== '') {
                this.dorms = this.dorms.map(_dorms => _dorms.filter(dorm => parseInt(dorm.price) <= parseInt(data.maxPrice) ));
            }

            this.dorms = this.dorms.map(_dorms => _dorms.filter(dorm => {
              let isSuperset = data.roomFacility.every(function (val) {
                let result = false;
                for (var i = 0; i < dorm.roomFacility.length; i++) {
                  if (dorm.roomFacility[i].name === val) {
                    result = true;
                    break;
                  }
                }
                return result;
              });
              return isSuperset;
            }  ));
            // console.log(data);
        } else  {
            this.dorms = this._DBDorm.render2();
            // console.log(this.dorms);
        }

        // console.log('length');
        let length = 0;
        this.dorms.subscribe(result => { 
          length = result.length;
          // console.log(length);
          if (length <= 0) {
            this._TOAST.showToastFailed();
          }
        });
        // console.log(length);
        // console.log(this.dorms);

        this._LOADER.hidePreloader();
      }
    });
    modal.present();
  }

  // listLocation() {
  //     let title = `Your current location\n\nLatitude: ${this.coords.lat}\nLongitude: ${this.coords.lng}`;
  //     this.map.addMarker({
  //       'position': this.location,
  //       'title': title,
  //       animation: GoogleMapsAnimation.DROP,
  //       'styles': {
  //         'text-align': 'right',
  //         'color': 'grey'
  //       }
  //     });
  // }

}
