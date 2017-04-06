import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

/*
  Generated class for the DatabaseUser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseUser {

  public currentUser: any;
  public users: FirebaseListObservable<any[]>;

  constructor(
    public http: Http,
    public angFire: AngularFire) {
    console.log('Hello DatabaseUser Provider');
    this.users = angFire.database.list('users');
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

  render2(): FirebaseListObservable<any> {
    this.users = this.angFire.database.list('users');
    return this.users;
  }

  delete(id): Promise<any> {

    // Delete firebase auth data

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

  update(id, userObj): Promise<any> {

    console.log(id);
    console.log(userObj);
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     this.currentUser = user;
    //   } else {
    //     this.currentUser = null;
    //   }
    // });
    // console.log(this.currentUser);

    return new Promise((resolve) => {
      // Update firebase auth data

      var updateRef = firebase.database().ref('users').child(id);
      updateRef.update(userObj);
      resolve(true);
    });
  }

}
