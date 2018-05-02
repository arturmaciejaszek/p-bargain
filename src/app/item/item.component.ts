import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AuthService } from './../auth/auth.service';
import { Item } from './item.model';
import { User } from './../auth/user.model';
import { PromptComponent } from './../shared/prompt/prompt.component';
import * as fromRoot from '../app.reducer';
import * as ItemActions from '../item/item.actions';
import { getUser } from './../app.reducer';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() item: Item;
  @Input() photos: string[];
  @Input() editOn: boolean;
  owner$: Observable<User>;
  loggedUser$: Observable<User>;
  swiperConfig: SwiperConfigInterface;
  sub: Subscription;

  constructor(private db: AngularFirestore,
              private dialog: MatDialog,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.loggedUser$ = this.store.select(getUser);
    if (this.item.owner) {
      this.sub = this.db.doc<Item>(`items/towns/${this.item.town}/${this.item.uid}`).valueChanges()
        .subscribe( (item: Item) => {
        this.item = item;
        this.owner$ = this.db.collection('users').doc<User>(this.item.owner).valueChanges();
      });
    } else {
      this.owner$ = this.store.select(getUser);
    }

    this.swiperConfig = {
      slidesPerView: 1,
      keyboard: true,
      mousewheel: true,
      scrollbar: true,
    };

  }

  buy() {
    let fastbuy: boolean;
    let loggedUserUID: string;
    this.loggedUser$.pipe(take(1)).subscribe( res => {
      fastbuy = res.fastBuy;
      loggedUserUID = res.uid;

      if (fastbuy === true) {
        this.store.dispatch( new ItemActions.BuyItem({
          uid: this.item.uid,
          changes: {
            ...this.item,
            buyer: loggedUserUID,
            sold: new Date(),
            status: 'sold'
          }
        }));
      } else {
        const dialogRef = this.dialog.open(PromptComponent, {hasBackdrop: false});

        dialogRef.afterClosed().pipe(take(1)).subscribe( ref => {
          if (ref) {
            this.store.dispatch( new ItemActions.BuyItem({
              uid: this.item.uid,
              changes: {
                ...this.item,
                buyer: loggedUserUID,
                sold: new Date(),
                status: 'sold'
                }
            }));
          }
        });
      }
    });
  }

  delete() {
    const dialogRef = this.dialog.open(PromptComponent, {hasBackdrop: false});

    dialogRef.afterClosed().pipe(take(1)).subscribe( res => {
      if (res) {
        this.store.dispatch( new ItemActions.DeleteItem(this.item));
      }
    });
  }

  ngOnChanges() {
    if (this.photos) {
      this.item.photos = this.photos;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
