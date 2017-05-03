import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DormService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DormService {

  constructor(
    public http: Http,
    public storage: Storage) {
    console.log('Hello DormService Provider');
  }

  getDormMapCoordinate(ne_latitude: any, ne_longitude: any, sw_latitude: any, sw_longitude: any): Promise<any> {
    return new Promise((resolve) => {
      let url = 'http://172.19.11.114:8000/app_dev.php/api/dormitory/show';

      this.storage.get('token').then((value) => {
        console.log(value);

        var headers = new Headers({
          'Authorization': 'Bearer' + ' ' + value
        });
        let options = new RequestOptions({headers: headers});

        let postParams = {
          ne_latitude: ne_latitude,
          ne_longitude: ne_longitude,
          sw_latitude: sw_latitude,
          sw_longitude: sw_longitude
        };

        this.http.post(url, postParams, options).subscribe(data => {
          console.log('success');
          console.log(data);
          resolve(data);
        }, error => {
          console.log('error');
          console.log(error);
          resolve(error);
        });
      });
    });
  }

}
