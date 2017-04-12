import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Preloader } from '../../providers/preloader';

/*
  Generated class for the DormDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dorm-detail',
  templateUrl: 'dorm-detail.html'
})
export class DormDetailPage {

  public dorm: any;
  public roomFacilities: any[];
  public generalFacilities: any[];
  public publicFacilities: any[];
  public bathroom: any[];
  public parking: any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.dorm = navParams.get('dorm');
      let k;

      console.log(this.dorm.roomFacility);

      console.log(this.dorm.generalFacility);
      console.log(this.dorm.publicFacility);
      console.log(this.dorm.bathroom);
      console.log(this.dorm.parking);
    }

  closeModal(val = null) {
    this.viewCtrl.dismiss(val);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DormDetailPage');
  }

}
