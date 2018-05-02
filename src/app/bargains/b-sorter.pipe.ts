import { Pipe, PipeTransform } from '@angular/core';

import { Item } from './../item/item.model';

@Pipe({
  name: 'bSorter'
})
export class BSorterPipe implements PipeTransform {

  transform(value: Item[], uid: string, sold: boolean): Item[] {
    if (sold) {
      return value.filter( item => item.owner === uid);
    } else if (!sold) {
      return value.filter( item => item.buyer === uid);
    } else {
      return value;
    }
  }

}
