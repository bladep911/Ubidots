import {Injectable} from '@angular/core';
import {HttpClient} from '../http-client/http.client';
import Rx from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {IoTDevice, IoTVariable} from "../../model";
import {Observable} from "rxjs/Observable";
import {Network} from "@ionic-native/network";
import {Platform} from "ionic-angular";


declare var navigator: any;
declare var Connection: any;
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

    private devices: IoTDevice[];
    private variables: IoTVariable[];

    constructor( public httpClient: HttpClient, public network: Network, public platform: Platform) {

    }

    /**
     * /return device stored by the application
     * @param {boolean} forceFetch force the reloading of the devices
     * @returtns {Observable<IoTDevice[]>} observable containing the device list
     */
    public getDevices(forceFetch: boolean = false): Observable<IoTDevice[]> {
        //create observable source

        var obserNetwork = this.checkNetwork();
        return obserNetwork.flatMap(
            connected => {
                if (connected) {
                    //if connected try to get update data
                    var localData = localStorage.getItem('ubi-devices');
                    if (this.devices != null || localData != null) {
                        if (this.devices == null)
                            this.devices = JSON.parse(localData);

                        console.log(`## DEVICE GET FROM STORAGE ##`);
                        return Rx.Observable.of(this.devices);
                    }
                    return Rx.Observable.of([]);
                } else {
                    // get from cache
                    console.log(`## DEVICE GET FROM SERVICE ##`);
                    return this.loadDevices();
                }
            });
    }

    /**
     * Call Ubidots rest api to get the device list
     * @param {Subject<IoTDevice[]>} observable source where to add service response
     * @returns {Observable<IoTDevice[]>} observable containing the device list
     */
    private loadDevices(): Observable<IoTDevice[]>{
        var source = new Subject<IoTDevice[]>();

        this.httpClient.get(`${this.baseUbiUrl}datasources`, this.token,
            response => {
                console.log(`## DEVICE RECEIVED FROM SERVICE ##`);
                this.devices = response.json().results;
                localStorage.setItem('ubi-devices', JSON.stringify(this.devices));
                source.next(this.devices);
                source.complete();
            });

        return source.asObservable();
    }

    private checkNetwork() {
        var connected = new Subject<boolean>();
        this.platform.ready().then(() => {
            console.log("Network Type: "+ this.network.type);
            connected.next(this.network.type == 'none');
            connected.complete();
        });
        return connected.asObservable();
    }
}

