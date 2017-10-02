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

    constructor(public navCtrl: NavController, public navParams: NavParams, private ubiService: UbiServiceProvider) {
    }

    ngOnInit() {
        this.ubiService.getDevices().subscribe(
            devices => {
                for (let i in devices){
                    let dev:IoTDevice = devices[i];
                    console.log(`Device #${i}: ${dev.name}`);
                }
            }
        );
    }

    backHome() {
        this.navCtrl.pop();
    }

}
