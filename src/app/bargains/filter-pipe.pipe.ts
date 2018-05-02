import { Pipe, PipeTransform } from '@angular/core';

import { Item } from './../item/item.model';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Item[], filterString: string): Item[] {
    if (filterString !== '' || filterString != undefined) {
      return value.filter( (item: Item) => item.name.toLowerCase().includes(filterString.toLowerCase()));
    } else {
      return value;
    }
  }

}
