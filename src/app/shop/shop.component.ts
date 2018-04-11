import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../auth/auth.service';
import { Item } from './../item/item.model';
import { User } from 'firebase';
import { IgnoredItem } from './../item/ignored-item.model';
import * as fromItem from '../item/item.reducer';
import * as ItemActions from '../item/item.actions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  data$: Observable<Item[]>;
  ignoredList: string[] = [];
  userUID: string;
  sub: Subscription[] = [];

  constructor(private store: Store<fromItem.State>,
              private as: AuthService,
              private db: AngularFirestore) { }

  ngOnInit() {
    this.sub.push(this.as.user$.pipe(take(1)).subscribe( user => {
      this.userUID = user.uid;
    }));

    this.sub.push(this.db.doc(`users/${this.userUID}/ignored/list`)
      .valueChanges().subscribe( (list: {list: string[]}) => {
        if (list) {
          this.ignoredList = list.list;
        }
      }));

    this.data$ = this.store.select( fromItem.selectAll );
  }

  ignore(item: Item) {
    const ignoreItemData: IgnoredItem = {
      uid: item.uid,
      posted: +item.posted
    };
    this.ignoredList.push(JSON.stringify(ignoreItemData));
    this.store.dispatch(new ItemActions.IgnoreItem(item));
    this.db.doc(`users/${this.userUID}`).collection('ignored').doc('list').set({list: this.ignoredList});
  }

  ngOnDestroy() {
    this.sub.forEach( sub => sub.unsubscribe());
  }

}
