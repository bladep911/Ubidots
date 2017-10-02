import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UbiServiceProvider} from "../../providers/ubi-service/ubi.service";
import {DevicePage} from "../device/device";
import {IoTDevice} from '../../model';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    private deviceList: IoTDevice[];

    constructor(public navCtrl: NavController, public ubiService: UbiServiceProvider) {

    }

    ngOnInit() {
        console.log('## HOME GET DEVICES ##');
        this.ubiService.getDevices().subscribe(
            devices => {
                this.deviceList = devices;
            }
        );
    }

    openDevice(): void {
        this.navCtrl.push(DevicePage);
    }

    deviceSelected(device): void {

    }

}
