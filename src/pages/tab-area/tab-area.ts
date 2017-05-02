import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the TabArea page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var google;

@Component({
  selector: 'page-tab-area',
  templateUrl: 'tab-area.html'
})
export class TabAreaPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  coords: any;
  dorms: any;
  token: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
    public toaster: ToastController,
    public http: Http,
    public storage: Storage,
    // public locac: LocationAccuracy,
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabAreaPage');
    
    // get dorms list from API

    this.getDormsList();
    this.geolocate();
    // this.loadMap();
  }

  getDormsList(): any {
    let url = 'http://172.19.11.114:8000/app_dev.php/api/dormitory/show';
    // console.log(this.storage.get('token'));
    this.storage.get('token').then((value) => {
      console.log(value);
      this.token = value;
    });

    console.log(this.token);
    var headers = new Headers({
      'Authorization': 'Bearer' + ' '
    });
    let options = new RequestOptions({headers: headers});

    let postParams = {
      ne_latitude: -6.872652934261064,
      ne_longitude: 107.67946125439448,
      sw_latitude: -6.957859223694296,
      sw_longitude: 107.56616474560542
    };

    // this.http.post
  }

  geolocate(): Promise<any> {
    return new Promise((resolve) => {
      let options = {
        enableHighAccuracy: true
      };

      this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
        // console.log(position);
        this.loadMap(position.coords.latitude, position.coords.longitude);
        resolve(position);
        // this.getCountry(position);
      }).catch((err) => {
        alert(err);
        resolve(null);
      });
    });
  }

  getCountry(pos) {
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((res: NativeGeocoderReverseResult) => {
      let country = this.toaster.create({
        message: res.countryName,
        duration: 4000
      });
      country.present();
    });
  }

  loadMap(latitude: any, longitude: any) {
    // console.log(latitude);
    // console.log(longitude);
    // console.log('coords');
    // console.log(this.coords);
    // let latLng = new google.maps.LatLng(-7.800683, 110.396568);
    let latLng = new google.maps.LatLng(latitude, longitude);
    let bandungCoords = new google.maps.LatLng(-6.9174639, 107.6191228);

    let mapOptions = {
      // center: latLng,
      center: bandungCoords,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // console.log(this.map);

    // Add Marker
    var centerMarker = new google.maps.Marker({position: latLng, title: 'Current Position'});
    centerMarker.setMap(this.map);
  }

}
