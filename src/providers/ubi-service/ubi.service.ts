import {Injectable} from '@angular/core';
import {HttpClient} from '../http-client/http.client';
import Rx from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {IoTDevice, IoTVariable} from "../../model";
import {Observable} from "rxjs/Observable";
import {Network} from "@ionic-native/network";
import {Platform} from "ionic-angular";
import { ToastController } from 'ionic-angular';



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

    constructor(public httpClient: HttpClient, public network: Network,
                public platform: Platform, public toastCtrl: ToastController) {

    }


    /**
     * Check the connection status
     * @returns {Observable<boolean>}
     */
    private checkNetwork() {
        //check connection network state
        var connected = new Subject<boolean>();
        this.platform.ready().then(() => {
            console.log("Network Type: "+ this.network.type);
            connected.next(this.network.type == 'none');
            connected.complete();
        });
        return connected.asObservable();
    }

    //TODO: move to a service
    private showToast(message:string, position: 'bottom') {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    /**
     * /return device stored by the application
     * @param {boolean} forceFetch force the reloading of the devices
     * @returtns {Observable<IoTDevice[]>} observable containing the device list
     */
    public getDevices(forceFetch: boolean = false): Observable<IoTDevice[]> {
        // source network observer
        var obserNetwork = this.checkNetwork();

        return obserNetwork.flatMap(
            connected => {
                if (connected) {
                    // there is network connection => call service
                    console.log(`## DEVICE GET FROM SERVICE ##`);
                    return this.loadDevices();
                } else {
                    //no connection available => try to get from cache
                    var localData = localStorage.getItem('ubi-devices');
                    if (this.devices != null || localData != null) {
                        if (this.devices == null)
                            this.devices = JSON.parse(localData);

                        console.log(`## DEVICE GET FROM STORAGE ##`);
                        return Rx.Observable.of(this.devices);
                    }
                    return Rx.Observable.of([]);
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


}

