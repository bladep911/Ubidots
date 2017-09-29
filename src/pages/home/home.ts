import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UbiServiceProvider} from "../../providers/ubi-service/ubi.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, public ubiService:UbiServiceProvider) {

  }

  ngOnInit() {
    this.ubiService.getDevices();
  }
}
