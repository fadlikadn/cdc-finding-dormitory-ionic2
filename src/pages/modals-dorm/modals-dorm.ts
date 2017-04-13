import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Image } from '../../providers/image';
import { Preloader } from '../../providers/preloader';
import { DatabaseDorm } from '../../providers/database-dorm';
import * as firebase from 'firebase';

/*
  Generated class for the ModalsDorm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modals-dorm',
  templateUrl: 'modals-dorm.html'
})
export class ModalsDormPage {

  public dormForm: any;
  public dormImage: any;
  public dormImageExist: any;
  // public dorms: FirebaseListObservable<any[]>;
  public dorms: any;
  public dormName: any = '';
  public dormGender: any = '';
  public dormLocation: any = '';
  public dormPeriod: any = '';
  public dormPrice: any = '';
  public dormNotes: any = '';
  public dormDescription: any = '';
  public dormRoomFacility: any = [];
  public dormBathroom: any = [];
  public dormGeneralFacility: any = [];
  public dormParking: any = [];
  public dormPublicFacility: any = [];
  public dormId: string = '';
  public title;
  public isEditable: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public _FB: FormBuilder,
    public _FIRE: AngularFire,
    public viewCtrl: ViewController,
    public _IMG: Image,
    public _LOADER: Preloader,
    public _DB: DatabaseDorm) {
      this.dormForm = _FB.group({
        'name': ['', Validators.compose([Validators.minLength(4), Validators.required]) ],
        'gender': ['', Validators.compose([Validators.required])],
        'location': ['', Validators.compose([Validators.required])],
        'period': [''],
        'price': ['', Validators.compose([Validators.required])],
        'notes': [''],
        'description': [''],
        'roomFacility': [''],
        'bathroom': [''],
        'generalFacility': [''],
        'parking': [''],
        'publicFacility': ['']
      });

      this.dorms = firebase.database().ref('dorms');

      if (params.get('isEdited')) {
        let dorm = params.get('dorm');
        let k;
        console.log(dorm);
        this.dormName = dorm.name;
        this.dormGender = dorm.gender;
        this.dormLocation = dorm.location;
        this.dormPeriod = dorm.period;
        this.dormPrice = dorm.price;
        this.dormNotes = dorm.notes;
        this.dormDescription = dorm.description;
        // this.dormRoomFacility = dorm.roomFacility;
        // this.dormBathroom = dorm.bathroom;
        // this.dormGeneralFacility = dorm.generalFacility;
        // this.dormParking = dorm.parking;
        // this.dormPublicFacility = dorm.publicFacility;
        this.dormId = dorm.$key;
        this.dormImage = dorm.image;
        this.dormImageExist = dorm.image;

        // console.log(dorm);
        // console.log(this.dormId);

        // console.log(this.dormRoomFacility);
        for (k in dorm.roomFacility) {
          this.dormRoomFacility.push(dorm.roomFacility[k].name);
        }
        // console.log(this.dormRoomFacility);

        for (k in dorm.bathroom) {
          this.dormBathroom.push(dorm.bathroom[k].name);
        }

        for (k in dorm.generalFacility) {
          this.dormGeneralFacility.push(dorm.generalFacility[k].name);
        }

        for (k in dorm.parking) {
          this.dormParking.push(dorm.parking[k].name);
        }

        for (k in dorm.publicFacility) {
          this.dormPublicFacility.push(dorm.publicFacility[k].name);
        }

        this.isEditable = true;
        this.title = dorm.name;
      } else {
        this.title = 'Add new dormitory';
      }
  }

  saveDorm(val) {
    this._LOADER.displayPreloader();

    console.log(val);
    console.log(this.dormForm.controls);

    let name: string = this.dormForm.controls["name"].value;
    let gender: string = this.dormForm.controls["gender"].value;
    // let image: string = this.dormImage;
    let location: string = this.dormForm.controls["location"].value;
    let period: string = this.dormForm.controls["period"].value;
    let price: string = this.dormForm.controls["price"].value;
    let notes: string = this.dormForm.controls["notes"].value;
    let description: string = this.dormForm.controls["description"].value;
    let roomFacility: any = this.dormForm.controls["roomFacility"].value;
    let bathroom: any = this.dormForm.controls["bathroom"].value;
    let generalFacility: any = this.dormForm.controls["generalFacility"].value;
    let parking: any = this.dormForm.controls["parking"].value;
    let publicFacility: any = this.dormForm.controls["publicFacility"].value;
    let roomFacilityJson: any = [];
    let bathroomJson: any = [];
    let generalFacilityJson: any = [];
    let parkingJson: any = [];
    let publicFacilityJson: any = [];
    let k: any;

    for (k in roomFacility) {
      console.log(roomFacility[k]);
      roomFacilityJson.push({
        "name": roomFacility[k]
      });
    }
    console.log(roomFacilityJson);

    for (k in bathroom) {
      bathroomJson.push({
        "name": bathroom[k]
      });
    }

    for (k in generalFacility) {
      generalFacilityJson.push({
        "name": generalFacility[k]
      });
    }

    for (k in parking) {
      parkingJson.push({
        "name": parking[k]
      });
    }

    for (k in publicFacility) {
      publicFacilityJson.push({
        "name": publicFacility[k]
      });
    }

    if (this.isEditable) {
      // Edit
      // if (image !== this.dormImageExist) {
      //   this._DB.up
      // }

      this._DB.update(this.dormId, {
        name: name,
        gender: gender,
        location: location,
        period: period,
        price: price,
        notes: notes,
        description: description,
        roomFacility: roomFacilityJson,
        bathroom: bathroomJson,
        generalFacility: generalFacilityJson,
        parking: parkingJson,
        publicFacility: publicFacilityJson
      }).then((data) => {
        this._LOADER.hidePreloader();
      });
    } else {
      // Add
      this._DB.add({
        name: name,
        gender: gender,
        location: location,
        period: period,
        price: price,
        notes: notes,
        description: description,
        roomFacility: roomFacilityJson,
        bathroom: bathroomJson,
        generalFacility: generalFacilityJson,
        parking: parkingJson,
        publicFacility: publicFacilityJson
      }).then((data) => {
        this._LOADER.hidePreloader();
      });
    }

    this.closeModal(true);
  }

  closeModal(val = null) {
    this.viewCtrl.dismiss(val);
  }

  selectImage() {
    this._IMG.selectImage().then((data) => {
      this.dormImage = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalsDormPage');
  }

}
