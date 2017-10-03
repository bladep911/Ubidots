import {Component, Input} from '@angular/core';
import {IoTDevice} from "../../model/iot.device";

/**
 * Generated class for the DeviceCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'device-card',
    templateUrl: 'device-card.html'
})
export class DeviceCardComponent {

    @Input() device: IoTDevice;

    constructor() {

    }

}
