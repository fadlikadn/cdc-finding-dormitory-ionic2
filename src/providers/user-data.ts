import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {

  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  TOKEN = 'token';

  public OK = 'OK';
  public ERROR = 'ERROR';

  constructor(
    public events: Events,
    public storage: Storage,
    public http: Http) {
    console.log('Hello UserData Provider');
  }

  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  }

  loginToken(username: string, token: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set(this.TOKEN, token);
    this.setUsername(username);
    this.events.publish('user:login');
  }

  signup(username: string): void {
    this.storage
  }

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove(this.TOKEN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  }

  setUsername(username: string): void {
    this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

}
