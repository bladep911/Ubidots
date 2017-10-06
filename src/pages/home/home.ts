import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UbiServiceProvider} from "../../providers/ubi-service/ubi.service";
import {IoTDevice} from '../../model';
import {DevicePage} from '../device/device';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage implements OnInit {

    private iotDevices: IoTDevice[];

    constructor(public navCtrl: NavController, public ubiService: UbiServiceProvider) {

    }

    ngOnInit() {
        console.log('## PAGE HOME - GET DEVICES##');
        this.ubiService.getDevices().subscribe(
            devices => { this.setDevices(devices); },
            error => {console.log("Home page error getting devices:", error.message);}
        );
    }

    private setDevices(devices:IoTDevice[]): void{
        this.iotDevices = devices;
/*        for (let i=0; i<devices.length; i++) {
            let tmp: IoTDevice[] = [devices[i++]];
            if (i < devices.length) tmp.push(devices[i]);
            this.iotDevices.push(tmp);
        }*/
    }

    selectDevice(selectedDevice): void {
        this.navCtrl.push( DevicePage, {device: selectedDevice});
    }

}
