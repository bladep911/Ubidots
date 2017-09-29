import {IoTVariable, IoTVarValue} from './iot.variable';

/* Device Example
{
  "id": "5684415076254267da0414cf",
  "owner": "http://things.ubidots.com/api/v1.6/users/7061",
  "parent": null,
  "name": "Water Tank",
  "url": "http://things.ubidots.com/api/v1.6/datasources/5684415076254267da0414cf",
  "context": {},
  "tags": [],
  "created_at": "2015-12-30T20:40:48.676",
  "variables_url": "http://things.ubidots.com/api/v1.6/datasources/5684415076254267da0414cf/variables",
  "number_of_variables": 0,
  "last_activity": null,
  "description": null
}*/

export class IoTDevice {
    id: string;
    owner: string;
    parent: IoTDevice;
    name: string;
    url: string;
    context: {};
    tags: string[];
    created_at: string; //TODO: add moment js to manage datetimes
    number_of_variables: number;
    last_activity: string;
    description: string;
    variables_url: string;
    variables: IoTVariable[];
}
