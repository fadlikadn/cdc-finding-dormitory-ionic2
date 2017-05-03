import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { DormService } from '../../providers/dorm-service';

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
    public dormService: DormService,
    // public locac: LocationAccuracy,
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabAreaPage');
    
    this.geolocate();
    // get dorms list from API
    this.getDormsList();
    // this.loadMap();
  }

  getDormsList() {
    this.dormService.getDormMapCoordinate(-6.872652934261064, 107.67946125439448, -6.957859223694296, 107.56616474560542).then(dormService => {
      console.log('Get Dorm List');
      console.log(dormService);

      let body = JSON.parse(dormService._body);
      console.log(body);

      body.data.forEach(dorm => {
        let dormCoord = new google.maps.LatLng(dorm.latitude, dorm.longitude);
        var marker = new google.maps.Marker({position: dormCoord, title: dorm.name});
        marker.setMap(this.map);
      });
    });
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
    var centerMarker = new google.maps.Marker({position: bandungCoords, title: 'Current Position'});
    centerMarker.setMap(this.map);
  }

}
