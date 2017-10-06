import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UbiServiceProvider} from "../../providers/ubi-service/ubi.service";
import {IoTDevice} from '../../model';


/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-device',
    templateUrl: 'device.html',
})
export class DevicePage implements OnInit {

    private selectedDevice: IoTDevice;

    constructor(public navCtrl: NavController, public navParams: NavParams, private ubiService: UbiServiceProvider) {
        this.selectedDevice=navParams.get('device');
    }

    ngOnInit() {
        console.log('## PAGE HOME - GET DEVICES##');
        this.ubiService.getDevices().subscribe(
            devices => { console.log("Device Get Success:"); },
            error => {console.log("Home page error getting devices:", error.message);}
        );
    }

    backHome() {
        this.navCtrl.pop();
    }

}
