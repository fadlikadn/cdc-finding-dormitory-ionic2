import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

/*
  Generated class for the DatabaseUser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseUser {

  constructor(public http: Http) {
    console.log('Hello DatabaseUser Provider');
  }

  render(): Observable<any> {
    try {
      return new Observable(observer => {
        let users: any = [];
        firebase.database().ref('users').orderByKey().once('value', (items: any) => {
          items.forEach((item) => {
            users.push(item.val());
          });

          observer.next(users);
          observer.complete();
        },
        (error) => {
          console.log("Observer error: ", error);
          console.dir(error);
          observer.error(error);
        });
      });
    } catch (error) {
      console.log('Observable for retrieving user fails');
      console.dir(error);
    }
  }

  delete(id): Promise<any> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  add(userObj): Promise<any> {
    return new Promise((resolve) => {
      let addRef = firebase.database().ref('users');
      addRef.push(userObj);
      resolve(true);
    });
  }

  updateDatabase(id, userObj): Promise<any> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

}
