import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import { Observable, zip, of } from 'rxjs';
import { take, catchError, map, combineLatest } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ErrorHandler } from './../shared/error-snackbar.service';
import { getUser } from './../app.reducer';
import { AuthService } from './../auth/auth.service';
import { Item } from './item.model';
import { Bargain } from './../bargains/bargain.model';
import { IgnoredItem } from './ignored-item.model';
import { User } from './../auth/user.model';
import { ItemQuery } from './item-query.model';
import * as ItemActions from './item.actions';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
    private router: Router,
    private store: Store<fromRoot.State>,
    private errorHandler: ErrorHandler
  ) {}

  @Effect()
  fetchData: Observable<Action> = this.actions$
    .ofType(ItemActions.FETCH_DATA)
    .do(_ => this.store.dispatch(new UI.StartLoading()))
    .do(_ => this.store.dispatch(new ItemActions.ResetState()))
    .map((action: ItemActions.FetchData) => action.payload)
    .switchMap((payload: ItemQuery) => {
      return of(payload)
        .switchMap(res =>
          this.runQuery(res).pipe(combineLatest(of(res.ownerUID)))
        )
        .catch(err => of());
    })
    .mergeMap(([queryResult, userUID]: [any, string]) => {
      if (!userUID) {
        return this.filterData(queryResult).pipe(combineLatest(of(false)));
      } else {
        return of(queryResult).pipe(combineLatest(of(true)));
      }
    })
    .pipe(
      map(([result, destructive]: [Item[], boolean]) => {
        this.store.dispatch(new UI.StopLoading());
        if (destructive) {
          return new ItemActions.FetchDataSuccess(result);
        } else {
          return new ItemActions.SetShopData(result);
        }
      }),
      catchError(err => {
        return of(new ItemActions.CallFailure(err));
      })
    );

  @Effect()
  deleteItem: Observable<Action> = this.actions$
    .ofType(ItemActions.DELETE_ITEM)
    .map((action: ItemActions.DeleteItem) => action.payload)
    .mergeMap((item: Item) =>
      this.batchDelete(item)
        .then(_ => new ItemActions.CallSuccess('success'))
        .catch(err => new ItemActions.CallFailure('error'))
    );

  @Effect()
  createItem: Observable<Action> = this.actions$
    .ofType(ItemActions.CREATE_ITEM)
    .map((action: ItemActions.CreateItem) => action.payload)
    .mergeMap((item: Item) =>
      this.batchCreate(item)
        .then(_ => {
          this.router.navigate([`/profile`]);
          return new ItemActions.CallSuccess('success');
        })
        .catch(err => new ItemActions.CallFailure('error'))
    );

  @Effect()
  buyItem: Observable<Action> = this.actions$
    .ofType(ItemActions.BUY_ITEM)
    .map((action: ItemActions.BuyItem) => action.payload)
    .mergeMap((data: { uid: string; changes: Item }) =>
      this.batchOnBuy(data)
        .then(_ => {
          this.store.dispatch(new ItemActions.IgnoreItem(data.changes));
          return new ItemActions.CallSuccess('You got it!');
        })
        .catch(err => new ItemActions.CallFailure('Sorry someone was faster'))
    );

  @Effect({ dispatch: false })
  callSuccess: Observable<Action> = this.actions$
    .ofType(ItemActions.CALL_SUCCESS)
    .map((action: ItemActions.CallSuccess) => action.payload)
    .do(res => this.errorHandler.show(res, null));

  @Effect({ dispatch: false })
  callFailure: Observable<Action> = this.actions$
    .ofType(ItemActions.CALL_FAILURE)
    .map((action: ItemActions.CallFailure) => action.payload)
    .do(res => this.errorHandler.show(res, null));

  batchCreate(item: Item): Promise<any> {
    const createBatch = this.db.firestore.batch();

    const userItemsRef = this.db.doc(`users/${item.owner}/items/${item.uid}`)
      .ref;
    const townItemRef = this.db.doc(`items/towns/${item.town}/${item.uid}`).ref;

    createBatch.set(userItemsRef, item);
    createBatch.set(townItemRef, item);

    return createBatch.commit();
  }

  batchDelete(item: Item): Promise<any> {
    const createBatch = this.db.firestore.batch();

    const userItemsRef = this.db.doc(`users/${item.owner}/items/${item.uid}`)
      .ref;
    const townItemRef = this.db.doc(`items/towns/${item.town}/${item.uid}`).ref;

    createBatch.delete(userItemsRef);
    createBatch.delete(townItemRef);

    return createBatch.commit();
  }

  batchOnBuy(data: { uid: string; changes: Partial<Item> }): Promise<any> {
    const createBatch = this.db.firestore.batch();

    const userItemsRef = this.db.doc(
      `users/${data.changes.owner}/items/${data.uid}`
    ).ref;
    const townItemRef = this.db.doc(
      `items/towns/${data.changes.town}/${data.uid}`
    ).ref;
    const bargainItemRef = this.db.doc(`bargains/${data.uid}`).ref;

    return townItemRef.get().then(snapshot => {
      if (!snapshot.data().buyer) {
        createBatch.update(townItemRef, data.changes);
        createBatch.update(userItemsRef, data.changes);
        createBatch.set(bargainItemRef, data.changes);

        return createBatch.commit();
      } else {
        return null;
      }
    });
  }

  runQuery(query: ItemQuery): Observable<any> {
    if (query.ownerUID && query.bargains) {
      const itemsSold = this.db
        .collection<Bargain>('bargains', ref =>
          ref.where('owner', '==', query.ownerUID).where('status', '==', 'sold')
        )
        .valueChanges();
      const itemsBought = this.db
        .collection<Bargain>('bargains', ref =>
          ref.where('buyer', '==', query.ownerUID).where('status', '==', 'sold')
        )
        .valueChanges();
      return zip(itemsBought, itemsSold).map(([bought, sold]) => [
        ...bought,
        ...sold
      ]);
    } else if (query.ownerUID) {
      return this.db
        .collection('users')
        .doc(`${query.ownerUID}`)
        .collection('items')
        .valueChanges();
    } else if (query.town) {
      return this.db
        .collection(`items/towns/${query.town}`, ref => {
          let q:
            | firebase.firestore.CollectionReference
            | firebase.firestore.Query = ref;
          q = q.where('status', '==', 'active');
          if (query.category) {
            q = q.where('category', '==', query.category);
          }
          return q;
        })
        .valueChanges();
    } else {
      return of([]);
    }
  }

  filterData(data: Item[]): Observable<Item[]> {
    let userUID: string;
    let ignoredList: string[];

    return this.store
      .select(getUser)
      .pipe(take(1))
      .switchMap((user: User) => {
        userUID = user.uid;
        return this.db
          .doc(`users/${userUID}/ignored/list`)
          .valueChanges()
          .pipe(take(1))
          .map((list: { list: string[] }) => {
            if (list !== null) {
              ignoredList = list.list;
              let filteredArray: Item[];
              filteredArray = data.filter(item => {
                const check: IgnoredItem = {
                  uid: item.uid,
                  posted: +item.posted
                };
                if (ignoredList.indexOf(JSON.stringify(check)) === -1) {
                  return true;
                } else {
                  return false;
                }
              });
              return filteredArray;
            } else {
              return data;
            }
          });
      });
  }
}
