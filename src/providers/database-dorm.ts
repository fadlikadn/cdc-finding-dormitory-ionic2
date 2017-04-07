import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as firebase from 'firebase';

/*
  Generated class for the DatabaseDorm provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseDorm {

  public dorms2: FirebaseListObservable<any[]>;
  public dormRef: any;

  constructor(
      public http: Http,
      public angFire: AngularFire
      ) {
    this.dorms2 = angFire.database.list('dorms');
    console.log('Hello DatabaseDorm Provider');
  }

  render(): Observable<any> {
    try {
      return new Observable(observer => {
        let dorms: any = [];
        firebase.database().ref('dorms').orderByKey().once('value', (items: any) => {
          items.forEach((item) => {
            dorms.push(item.val());
          });

          observer.next(dorms);
          observer.complete();
        },
        (error) => {
          console.log("Observer error: ", error);
          console.dir(error);
          observer.error(error);
        });
      });
    } catch (error) {
      console.log('Observable for retrieveing dorm fails');
      console.dir(error);
    }
  }

  render2(): FirebaseListObservable<any> {
    this.dorms2 = this.angFire.database.list('dorms');
    return this.dorms2;
  }

  delete(id): Promise<any> {
    return new Promise((resolve) => {
      let ref = firebase.database().ref('dorms').child(id);
      ref.remove();
      resolve(true);
    });
  }

  delete2(id): Promise<any> {
    return new Promise((resolve) => {
      this.dorms2.remove(id);
      resolve(true);
    });
  }

  add(dormObj): Promise<any> {
    return new Promise((resolve) => {
      let addRef = firebase.database().ref('dorms');
      addRef.push(dormObj);
      resolve(true);
    });
  }

  update(id, dormObj): Promise<any> {
    return new Promise((resolve) => {
      var updateRef = firebase.database().ref('dorms').child(id);
      updateRef.update(dormObj);
      resolve(true);
    });
  }

  uploadImage(imageString): Promise<any> {
    let image: string = 'dorm-' + new Date().getTime() + '.jpg';
    let storageRef: any;
    let parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('dorms/' + image);
      parseUpload = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => {
        console.log('snapshot progress ' + _snapshot);
      },
      (_err) => {
        reject(_err);
      },
      (success) => {
        resolve(parseUpload.snapshot);
      });
    });
  }

  deleteImage(dorm): Promise<any> {
    let storageRef: any;
    let parseDelete: any;

    return new Promise((resolve, reject) => {

    });
  }

}
