import { Pipe, PipeTransform } from '@angular/core';
import { Message } from './message.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Message[], property: any): Message[] {
    if (value === null || property === '' || property === undefined) {
      return value;
    }
    const newVal = value.sort((a, b) => {
      const date1 = new Date(a[property]);
      const date2 = new Date(b[property]);

      if (date1 > date2) {
          return 1;
      } else if (date1 < date2) {
          return -1;
      } else {
          return 0;
      }
  });

  return newVal;
  }
}

