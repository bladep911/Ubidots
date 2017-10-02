import {Injectable} from '@angular/core';
import {HttpClient} from '../http-client/http.client';
import Rx from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
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

    public getDevices(forceFetch: boolean = false) {
        //create observable source
        var obserSource = new Subject<IoTDevice[]>();
        var localData = localStorage.getItem('ubi-devices');

        if (!forceFetch && (this.devices != null || localData != null)) {
            if (this.devices == null)
                this.devices = JSON.parse(localData);
            console.log(`## DEVICE GET FROM STORAGE ##`);
            return Rx.Observable.of(this.devices);
        }

        //rest get to service
        this.httpClient.get(this.deviceUrl, this.token,
            response => {
                console.log(`## DEVICE RECEIVED FROM SERVICE ##`);
                this.devices = response.json().results;
                localStorage.setItem('ubi-devices', JSON.stringify(this.devices));
                obserSource.next(this.devices);
                obserSource.complete();
            });

        return obserSource.asObservable();
    }

    getVariables() {
        this.httpClient.get(this.deviceUrl, this.token,
            response => {
                let data = response.json();
                this.variables = data;
                console.log(`## Variables Received ${this.variables.length} ## -> `, this.variables);
            });
    }
}

