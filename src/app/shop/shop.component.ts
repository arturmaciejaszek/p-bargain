import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../auth/auth.service';
import { getUser } from './../app.reducer';
import { Item } from './../item/item.model';
import { User } from 'firebase';
import { IgnoredItem } from './../item/ignored-item.model';
import * as fromItem from '../item/item.reducer';
import * as ItemActions from '../item/item.actions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [
    trigger('animate', [
      transition('void => *', [
        animate(300, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      // transition('* => void', [
      //   group([
      //     animate(300, style({
      //       color: 'red'
      //     })),
      //     animate(800, style({
      //       transform: 'translateX(100px)',
      //       opacity: 0
      //     }))
      //   ])
      // ])
    ]),
  ]
})
export class ShopComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  data$: Observable<Item[]>;
  ignoredList: string[] = [];
  drawerMode = 'side';
  userUID: string;
  userTown: string;
  sub: Subscription[] = [];

  constructor(private store: Store<fromItem.State>,
              private db: AngularFirestore,
              private mediaQueries: ObservableMedia) { }

  ngOnInit() {
    this.sub.push(this.mediaQueries.subscribe( (media: MediaChange) => {
      if (media.mediaQuery === '(min-width: 0px) and (max-width: 599px)') {
        this.drawerMode = 'push';
      } else {
        this.drawerMode = 'side';
      }
    }));
    this.sub.push(this.store.select(getUser).pipe(take(1)).subscribe( user => {
      if (user) {
        this.userUID = user.uid;
        this.userTown = user.town;
        this.sub.push(this.db.doc(`users/${this.userUID}/ignored/list`)
          .valueChanges().subscribe( (list: {list: string[]}) => {
            if (list) {
              this.ignoredList = list.list;
            }
          }));
      }
    }));

    this.loading$ = this.store.select(fromItem.getIsLoading);

    this.data$ = this.store.select( fromItem.getNonMine );
  }

  ignore(item: Item) {
    const ignoreItemData: IgnoredItem = {
      uid: item.uid,
      posted: +item.posted
    };
    let newList: string[];
    // this.ignoredList.push(JSON.stringify(ignoreItemData));
    newList = [...this.ignoredList, JSON.stringify(ignoreItemData)];
    this.store.dispatch(new ItemActions.IgnoreItem(item));
    this.db.doc(`users/${this.userUID}`).collection('ignored').doc('list').set({list: newList});
  }

  ngOnDestroy() {
    this.sub.forEach( sub => sub.unsubscribe());
  }

}
