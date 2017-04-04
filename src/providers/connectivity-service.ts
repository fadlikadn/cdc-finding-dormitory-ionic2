import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';

declare var Connection;

/*
  Generated class for the ConnectivityService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConnectivityService {

  onDevice: boolean;

  // constructor(public http: Http) {
  //   console.log('Hello ConnectivityService Provider');
  // }

  constructor(public platform: Platform) {
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if (this.onDevice && Network.type) {
        return Network.type !== Connection.NONE;
    } else {
        return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.onDevice && Network.type) {
        return Network.type === Connection.NONE;
    } else {
        return !navigator.onLine;
    }
  }

}
