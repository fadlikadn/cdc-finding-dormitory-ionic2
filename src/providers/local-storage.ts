import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LocalStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalStorage {

  private storage: Storage;
  constructor(public http: Http, public storageParams: Storage) {
    console.log('Hello LocalStorage Provider');
    this.storage = storageParams;
  }

  setKey(key, value) {
    this.storage.set(key, value);
  }

  getKey(key) {
    this.storage.get(key).then((value) => {
      console.log('Your name is ', value);
    });
  }

  removeKey(key) {
    this.storage.remove(key).then(() => {
      console.log('key has been removed');
    });
  }

  clearKeys() {
    this.storage.clear().then(() => {
      console.log('Keys have been cleared');
    });
  }

}
