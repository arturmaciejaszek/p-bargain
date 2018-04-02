import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';


import { Item } from './item.model';
import * as ItemActions from './item.actions';
import { ItemQuery } from './item-query.model';
export type Action = ItemActions.All;


@Injectable()
export class ItemEffects {


  constructor(private actions: Actions, private db: AngularFirestore, private loc: Location) {

  }

    @Effect()
    fetchData: Observable<Action> = this.actions.ofType(ItemActions.FETCH_DATA)
        .map( (action: ItemActions.FetchData) => action.payload)
        .switchMap( (payload: ItemQuery) => this.runQuery(payload))
        .map( (res: Item[]) => {
            return new ItemActions.FetchDataSuccess(res);
        });

    @Effect()
    deleteItem: Observable<Action> = this.actions.ofType(ItemActions.DELETE_ITEM)
        .map( (action: ItemActions.DeleteItem) => action.payload )
        .mergeMap( (item: Item) => of(this.batchDelete(item)) )
        .map( res => {
            return new ItemActions.CallSuccess();
        })
        .catch( err => {
           return of( new ItemActions.CallFailure());
        });

    @Effect()
    createItem: Observable<Action> = this.actions.ofType(ItemActions.CREATE_ITEM)
        .map( (action: ItemActions.CreateItem) => action.payload )
        .mergeMap( (item: Item) => of(this.batchCreate(item)) )
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
        .mergeMap( (data: {uid: string, changes: Partial<Item>}) => of(this.batchUpdate(data)))
        .map( res => {
            res.then( resolve => this.loc.back());
            return new ItemActions.CallSuccess();
        })
        .catch( err => {
           return of( new ItemActions.CallFailure());
        });

    // Atomic
    batchCreate(item: Item) {
        const createBatch = this.db.firestore.batch();

        const userItemsRef = this.db.doc(`users/${item.owner}/items/${item.uid}`).ref;
        const townItemRef = this.db.doc(`items/towns/${item.town}/${item.uid}`).ref;

        createBatch.set(userItemsRef, item);
        createBatch.set(townItemRef, item);

        return createBatch.commit();
    }

    batchDelete(item: Item) {
        const createBatch = this.db.firestore.batch();

        const userItemsRef = this.db.doc(`users/${item.owner}/items/${item.uid}`).ref;
        const townItemRef = this.db.doc(`items/towns/${item.town}/${item.uid}`).ref;

        createBatch.delete(userItemsRef);
        createBatch.delete(townItemRef);

        return createBatch.commit();
    }

    batchUpdate(data: {uid: string, changes: Partial<Item>}) {
        const createBatch = this.db.firestore.batch();

        const userItemsRef = this.db.doc(`users/${data.changes.owner}/items/${data.uid}`).ref;
        const townItemRef = this.db.doc(`items/towns/${data.changes.town}/${data.uid}`).ref;

        createBatch.update(userItemsRef, data);
        createBatch.update(townItemRef, data);

        return createBatch.commit();
    }

    runQuery(query: ItemQuery) {
        if (query.ownerUID) {
            return this.db.collection('users').doc(`${query.ownerUID}`).collection('items').valueChanges();
        } else {
            return this.db.collection(`items/towns/${query.town}`, ref => {
                let q: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                    q = q.where('status', '==', 'active');
                    if (query.category) { q = q.where('category', '==', query.category); }
                    if (query.price.minPrice) { q = q.where('price', '>=', query.price.minPrice); }
                    if (query.price.maxPrice) { q = q.where('price', '<=', query.price.maxPrice); }
                return q;
        }).valueChanges();
        }
    }

}
