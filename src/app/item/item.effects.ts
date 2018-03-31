import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Item } from './item.model';
import * as ItemActions from './item.actions';
export type Action = ItemActions.All;


@Injectable()
export class ItemEffects {
    // private itemsCollection: AngularFirestoreCollection<Item>;
    // items: Observable<Item[]>;

  constructor(private actions: Actions, private db: AngularFirestore) {
    //   this.getItems();
  }

  @Effect()
  fetchData: Observable<Action> = this.actions.ofType(ItemActions.FETCH_DATA)
      .map( (action: ItemActions.FetchData) => action.payload)
      .switchMap( (payload: string[]) => this.runQuery(payload))
      .map( (res: Item[]) => {
          return new ItemActions.FetchDataSuccess(res);
        });

    // getItems() {
    //     this.itemsCollection = this.db.collection<Item>('items');
    //     this.items = this.itemsCollection.valueChanges();
    // }

    runQuery(itemsUIDs: string[]) {
        // return this.db.collection('items', ref => ref.where( ref.id, '==', itemsUIDs.includes(ref.id) )).valueChanges();
        return this.db.collection<Item>('items').valueChanges();
    }

}
