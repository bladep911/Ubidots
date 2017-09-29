import { Injectable } from '@angular/core';
import {HttpClient} from '../http-client/http.client';
import 'rxjs/add/operator/map';
/*
  Generated class for the UbiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbiServiceProvider {

  //TODO: move to a config files
  private token:string = 'A1E-wNJ4GitSBv18l94CCCOqzhIuMiRCCL';
  private baseUbiUrl:string = 'https://things.ubidots.com/api/v1.6/';
  private deviceUrl: string;
  private variableUrl: string;

  constructor(public httpClient: HttpClient) {
    this.initServiceUrls();
  }

  private initServiceUrls(){
    this.httpClient.get(this.baseUbiUrl, this.token).subscribe(
      response => {
          let data = response.json();
          console.log('service response: ', data);
          this.deviceUrl = data.datasources;
          this.variableUrl = data.variables;
          console.log('Device Url:', this.deviceUrl);
          console.log('Variable Url:', this.variableUrl);
      },
      err => {
          console.log('An error occurred:', err);
      }
    );
  }

  public listDevices(){
    console.log(" ==> LIST DEVICE CALLED");
  }
}

