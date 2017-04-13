import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Preloader } from '../../providers/preloader';
import * as firebase from 'firebase';

/*
  Generated class for the DormFilter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dorm-filter',
  templateUrl: 'dorm-filter.html'
})
export class DormFilterPage {

  public dormFilter: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _FB: FormBuilder,
    public viewCtrl: ViewController,
    public _LOADER: Preloader) {
      this.dormFilter = _FB.group({
        'gender': [''],
        'period': [''],
        'minPrice': [''],
        'maxPrice': [''],
        'roomFacility': [''],
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DormFilterPage');
  }

  filterDorm() {
    let gender: string = this.dormFilter.controls["gender"].value;
    let period: string = this.dormFilter.controls["period"].value;
    let minPrice: string = this.dormFilter.controls["minPrice"].value;
    let maxPrice: string = this.dormFilter.controls["maxPrice"].value;
    let roomFacility: string = this.dormFilter.controls["roomFacility"].value;

    let filterVal = {
      gender: gender,
      period: period,
      minPrice: minPrice,
      maxPrice: maxPrice,
      roomFacility: roomFacility,
      status: true
    };

    // console.log(filterVal);

    this.closeModal(filterVal);
  }

  closeModal(val = null) {
    this.viewCtrl.dismiss(val);
  }

}
