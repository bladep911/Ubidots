import {IoTDevice} from './iot.device';

/* Device Example
{
    "id": "573644265753c902de57d123",
    "name": "temperature",
    "icon": "",
    "unit": null,
    "label": "temperature",
    "datasource":
    {
        "id": "573644265753c902de57d121",
        "name": "wifi-module",
        "url": "http://things.ubidots.com/api/v1.6/datasources/573644265753c902de57d121"
     },
     "url": "http://things.ubidots.com/api/v1.6/variables/573644265753c902de57d123",
     "description": null,
     "properties": {"_last_value": {"timestamp": 1463174248257, "value": 21.21,
     "context": {"lat": 1.12, "lng": 2.019}},
     "_last_activity": 1463174248000}, "tags": [],
     "values_url": "http://things.ubidots.com/api/v1.6/variables/573644265753c902de57d123/values",
     "created_at": "2016-05-13T21:16:22.772",
     "last_value": {"timestamp": 1463174248257, "value": 21.21,
     "context": {"lat": 1.12, "lng": 2.019}},
     "last_activity": 1463174248000, "type": 0, "derived_expr": ""

}*/

export class IoTVarValue {
    url: string;
    value: any;
    timestamp: number;
    context: {};
    created_at: "2016-05-13T21:17:28.257"
}

export class IoTVariable {
    id: string;
    name: string;
    icon: string;
    unit: string;
    label: string;
    datasource: IoTDevice;
    url: string;
    description: string;
    properties: {};
    tags: string[];
    values_url: string;
    created_at: string;
    last_value: IoTVarValue;
    last_activity: number;
    type: number;
    derived_expr: string;
}
