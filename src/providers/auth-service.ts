import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
// import { DatabaseUser } from 'database-user';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  public fireAuth: any;
  public userData: any;
  // private _DBUser: DatabaseUser;

  constructor(
    public http: Http,
  ) {
    // console.log('Hello AuthService Provider');
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/users');
    // console.log('hi, here');
    // console.log(this.userData);
  }

  doLogin(email: string, password: string): firebase.Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, user: any): firebase.Promise<any> {
    // insert data in firebase auth
    // console.log('register user');
    // console.log(user);
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        // add user to firebase database
        // insert data in firebase database realtime
        // this.userData.child(newUser.uid).set({email: email});
        // Add Users Data to Firebase Database
        console.log(newUser);
        user.id = newUser.uid;
        console.log(user);
        this.userData.child(newUser.uid).set(user);
        // console.log(newUser.uid);
        return newUser.uid;
      });
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  doLogout(): firebase.Promise<any> {
    return this.fireAuth.signOut();
  }

}
