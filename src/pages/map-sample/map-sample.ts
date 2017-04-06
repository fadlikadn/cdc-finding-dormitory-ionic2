import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation,
        GoogleMap,
        GoogleMapsAnimation,
        GoogleMapsEvent,
        GoogleMapsLatLng } from 'ionic-native';

/*
  Generated class for the MapSample page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map-sample',
  templateUrl: 'map-sample.html'
})
export class MapSamplePage {
  public coords: any;
  public isActive: boolean = false;

  private map: GoogleMap;
  private location: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform) {
      this.platform.ready().then(() => {
        
        GoogleMap.isAvailable().then((isAvailable: boolean) => {
          if (!isAvailable) {
            console.log('GoogleMap plugin is not available');
          } else {
            console.log('GoogleMap plugin is available');
          }

          // Geolocation.getCurrentPosition().then((resp) => {
            this.coords = {
              // lat: resp.coords.latitude,
              // lng: resp.coords.longitude
              lat: -7.800683,
              lng: 110.396568
            };
            this.location = new GoogleMapsLatLng(this.coords.lat, this.coords.lng);
            this.isActive = true;
            this.map = new GoogleMap('map', {
              'backgroundColor': 'white',
              'controls': {
                'compass': true,
                'indoorPicker': true,
                'zoom': true
              },
              'camera': {
                'latLng': this.location,
                'tilt': 90,
                'zoom': 12,
                'bearing': 50
              },
              'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
              }
            });

            this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
              console.log('Map is ready!');
            });
          }).catch((error) => {
            console.log(error);
          });
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapSamplePage');
  }

}
