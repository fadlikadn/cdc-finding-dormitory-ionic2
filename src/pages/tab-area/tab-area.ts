import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
    public toaster: ToastController,
    // public locac: LocationAccuracy,
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabAreaPage');
    // this.coords = this.geolocate();
    // console.log(this.coords);
    // console.log(this.coords.__zone_symbol__value);
    this.geolocate();
    // this.loadMap();
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

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // console.log(this.map);

    // Add Marker
    var centerMarker = new google.maps.Marker({position: latLng, title: 'Current Position'});
    centerMarker.setMap(this.map);
  }

}
