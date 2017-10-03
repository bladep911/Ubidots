import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the UnixMomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'unixMoment',
})
export class UnixMomentPipe implements PipeTransform {

  transform(value: string, ...args) {
      return moment(parseInt(value));
  }
}

