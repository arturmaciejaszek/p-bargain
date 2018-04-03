import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';

import { Item } from './../item/item.model';
import { IgnoredItem } from './../item/ignored-item.model';
import * as fromItem from '../item/item.reducer';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  data$: Observable<Item[]>;
  // IGNORED LIST WILL BE A COLLECTION SO IT DOESNT GET FETCHED EVERY TIME
  ignoredList: IgnoredItem[] = [];

  constructor(private store: Store<fromItem.State>) { }

  ngOnInit() {

    this.filterData();

  }

  filterData() {

    // FIND A WAY TO RETRIGGER IT

    this.data$ = this.store.select( fromItem.selectAll )
              .map( array => {
                const newArray: Item[] = [];
                array.forEach( item => {
                  const check: IgnoredItem = {uid: item.uid, posted: item.posted};
                  if (!this.ignoredList.includes(check)) {
                    newArray.push(item);
                  }
                });
                return newArray;
              });

  }

  ignore(item: Item) {
    const ignoreItemData: IgnoredItem = {
      uid: item.uid,
      posted: item.posted
    };
    this.ignoredList.push(ignoreItemData);

  }

  ngOnDestroy() {
    // update user preferences upon destoying component
  }

}
