import {Injectable} from '@angular/core';
import {HttpClient} from '../http-client/http.client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {IoTDevice, IoTVariable} from "../../model";

/*
  Generated class for the UbiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbiServiceProvider {

    //TODO: move to a config files
    private token: string = 'A1E-wNJ4GitSBv18l94CCCOqzhIuMiRCCL';
    private baseUbiUrl: string = 'https://things.ubidots.com/api/v1.6/';
    private deviceUrl: string;
    private variableUrl: string;

    private devices: IoTDevice[];
    private variables: IoTVariable[];

    constructor(public httpClient: HttpClient) {
        //this.initServiceUrls();
        this.deviceUrl = this.baseUbiUrl + 'datasources';
        this.variableUrl = this.baseUbiUrl + 'variables';
    }

    /*get devices
    private initServiceUrls() {
        this.httpClient.get(this.baseUbiUrl, this.token,
            response => {
                let data = response.json();
                this.deviceUrl = data.datasources;
                this.variableUrl = data.variables;
                console.log(`## Url received ## -> \n\t ${this.deviceUrl} \n\t${this.variableUrl}`);
            });
    }*/


    public getDevices(forceFetch: boolean = false) {
        if (this.devices == null || forceFetch) {
            console.log(`## Device url ## -> `, this.deviceUrl);
            return this.httpClient.get(this.deviceUrl, this.token,
                response => {
                    let data = response.json().results;
                    this.devices = data;
                    console.log(`## Device Received ## -> `, this.devices);
                });
        }
        console.log('## DEVICES FROM CACHE ##');
        return Observable.of(this.devices);
    }

    private getVariables() {
        this.httpClient.get(this.deviceUrl, this.token,
            response => {
                let data = response.json();
                this.variables = data;
                console.log(`## Variables Received ${this.variables.length} ## -> `, this.variables);
            });
    }
}

