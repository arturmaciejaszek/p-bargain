import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Item } from './../item/item.model';
import { User } from './../auth/user.model';
import * as fromItem from '../item/item.reducer';
import * as ItemActions from '../item/item.actions';
import { getUser } from './../app.reducer';

@Component({
  selector: 'app-bargains',
  templateUrl: './bargains.component.html',
  styleUrls: ['./bargains.component.scss']
})
export class BargainsComponent implements OnInit, OnDestroy {
  public loggedUser: User;
  data$: Observable<Item[]>;
  loading$: Observable<boolean>;
  currentlyExpanded: string;
  sub: Subscription;

  constructor(private store: Store<fromItem.State>) { }

  ngOnInit() {
    this.sub = this.store.select(getUser).subscribe( (user: User) => {
      if (user) {
        this.loggedUser = user;
        this.store.dispatch( new ItemActions.FetchData({ownerUID: user.uid, bargains: true}));
      }
    });

    this.loading$ = this.store.select(fromItem.getIsLoading);

    this.data$ = this.store.select(fromItem.selectAll);
  }

  expanded(e: string) {
    this.currentlyExpanded = e;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
