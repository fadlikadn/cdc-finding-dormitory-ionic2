import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AroundListPage } from '../around-list/around-list';
import { AroundMapPage } from '../around-map/around-map';
import { Geolocation,
        GoogleMap,
        GoogleMapsAnimation,
        GoogleMapsEvent,
        GoogleMapsLatLng } from 'ionic-native';


/*
  Generated class for the TabAround page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tab-around',
  templateUrl: 'tab-around.html'
})
export class TabAroundPage {

  // public aroundList: any = AroundListPage;
  // public aroundMap: any = AroundMapPage;
  // public around: string = 'map';
  public dorm: string = '';
  public coords: any;
  public isActive: boolean = false;
  private map: GoogleMap;
  private location: any;
  public around = 'list';

  // @ViewChild('map') mapElement: ElementRef;

  // map: any;
  // mapInitialised: boolean = false;
  // apiKey: any = 'AIzaSyCXafrE-rusPMcc7Gz5U2ktiqcPohtT-Hk';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform
    // public connectivityService: ConnectivityService,
    ) {
      this.platform.ready().then(() => {
          // this.loadMap();
      });
      // this.loadGoogleMaps();
  }

  loadMap() {
      GoogleMap.isAvailable().then((isAvailable: boolean) => {
          if(!isAvailable) {
              this.dorm = 'GoogleMap plugin is NOT available';
              console.log('GoogleMap plugin is NOT available');
          } else {
              this.dorm = 'GoogleMap plugin is available';
              console.log('GoogleMap plugin is available');

              this.coords = {
                  lat: -7.800683,
                  lng: 110.396568
              };
              this.isActive = true;
              this.location = new GoogleMapsLatLng(this.coords.lat, this.coords.lng);

              this.map = new GoogleMap('map', {
                  'backgroundColor': 'white',
                  'controls': {
                      'compass': true,
                      'myLocationButton': true,
                      'indoorPicker': true,
                      'zoom': true
                  },
                  'gestures': {
                      'scroll': true,
                      'tilt': true,
                      'rotate': true,
                      'zoom': true
                  },
                  'camera': {
                      'latLng': location,
                      'tilt': 90,
                      'zoom': 12,
                      'bearing': 50
                  }
              });

              this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
                  console.log('Map is ready');
                  this.listLocation();
              });
          }
      });
  }

  listLocation() {
      let title = `Your current location\n\nLatitude: ${this.coords.lat}\nLongitude: ${this.coords.lng}`;
      this.map.addMarker({
        'position': this.location,
        'title': title,
        animation: GoogleMapsAnimation.DROP,
        'styles': {
          'text-align': 'right',
          'color': 'grey'
        }
      });
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad TabAroundPage');
  }


}
