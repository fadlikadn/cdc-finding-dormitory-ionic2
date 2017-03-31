import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AroundListPage } from '../around-list/around-list';
import { AroundMapPage } from '../around-map/around-map';

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

  public aroundList: any = AroundListPage;
  public aroundMap: any = AroundMapPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabAroundPage');
  }

}
