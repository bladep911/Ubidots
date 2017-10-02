import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UbiServiceProvider} from "../../providers/ubi-service/ubi.service";
import {DevicePage} from "../device/device";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, public ubiService:UbiServiceProvider) {

  }

  ngOnInit() {
      console.log('## HOME GET DEVICES ##');
    this.ubiService.getDevices();
  }

  openDevice():void{
      this.navCtrl.push(DevicePage);
  }
}
