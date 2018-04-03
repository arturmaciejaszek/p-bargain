import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


import { AuthService } from './../auth/auth.service';
import { Item } from './item.model';
import { User } from './../auth/user.model';

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

  constructor(private db: AngularFirestore, private as: AuthService) { }

  ngOnInit() {
    this.loggedUser$ = this.as.user$;
    if (this.item.owner) {
      this.sub = this.db.doc<Item>(`items/towns/${this.item.town}/${this.item.uid}`).valueChanges()
        .subscribe( (item: Item) => {
        this.item = item;
        this.owner$ = this.db.collection('users').doc<User>(this.item.owner).valueChanges();
      });
    } else {
      this.owner$ = this.as.user$;
    }

    this.swiperConfig = {
      slidesPerView: 1,
      keyboard: true,
      mousewheel: true,
      scrollbar: true,
    };

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
