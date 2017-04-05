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

  // this.dorms: FirebaseListObservable<any[]>;

  constructor(
      public http: Http,
      public angFire: AngularFire
      ) {
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

  delete(id): Promise<any> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  add(dormObj): Promise<any> {
    return new Promise((resolve) => {
      let addRef = firebase.database().ref('dorms');
      addRef.push(dormObj);
      resolve(true);
    })
  }

  update(id, dormObj): Promise<any> {
    return new Promise((resolve) => {
      var updateRef = firebase.database().ref('dorms').child(id);
      updateRef.update(dormObj);
      resolve(true);
    });
  }

}
