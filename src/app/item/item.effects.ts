import { Location } from '@angular/common';
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

  constructor(private actions: Actions, private db: AngularFirestore, private loc: Location) {

  }

    @Effect()
    fetchData: Observable<Action> = this.actions.ofType(ItemActions.FETCH_DATA)
        .map( (action: ItemActions.FetchData) => action.payload)
        .switchMap( (payload: string) => this.runQuery(payload))
        .map( (res: Item[]) => {
            return new ItemActions.FetchDataSuccess(res);
        });

    @Effect()
    deleteItem: Observable<Action> = this.actions.ofType(ItemActions.DELETE_ITEM)
        .map( (action: ItemActions.DeleteItem) => action.payload )
        .mergeMap( (uid: string) => of(this.db.collection('items').doc(`${uid}`).delete()) )
        .map( res => {
            return new ItemActions.CallSuccess();
        })
        .catch( err => {
           return of( new ItemActions.CallFailure());
        });

    @Effect()
    createItem: Observable<Action> = this.actions.ofType(ItemActions.CREATE_ITEM)
        .map( (action: ItemActions.CreateItem) => action.payload )
        .mergeMap( (item: Item) => of(this.db.collection('items').doc(`${item.uid}`).set(item)) )
        .map( res => {
            res.then( resolve => this.loc.back());
            return new ItemActions.CallSuccess();
        })
        .catch( err => {
           return of( new ItemActions.CallFailure());
        });

    @Effect()
    updateItem: Observable<Action> = this.actions.ofType(ItemActions.UPDATE_ITEM)
        .map( (action: ItemActions.UpdateItem) => action.payload )
        .mergeMap( (data: {uid: string, changes: Partial<Item>}) => of(this.db.collection('items').doc(data.uid).update(data.changes)))
        .map( res => {
            res.then( resolve => this.loc.back());
            return new ItemActions.CallSuccess();
        })
        .catch( err => {
           return of( new ItemActions.CallFailure());
        });


    runQuery(ownerUID: string) {
        return this.db.collection<Item>('items', ref => ref.where('owner', '==', ownerUID)).valueChanges();
    }

}
