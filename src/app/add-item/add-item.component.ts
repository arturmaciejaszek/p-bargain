import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Store } from '@ngrx/store';

import { getUser } from './../app.reducer';
import * as fromItem from '../item/item.reducer';
import * as ItemActions from '../item/item.actions';
import { AuthService } from './../auth/auth.service';
import { Item } from './../item/item.model';
import { User } from './../auth/user.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  categories: string[];
  itemUID: string;
  user: User;
  sub: Subscription;
  photos: string[] = [];
  loading = false;

  constructor(private db: AngularFirestore,
    private authService: AuthService,
    private afs: AngularFireStorage,
    private loc: Location,
    private store: Store<fromItem.State>) { }

  ngOnInit() {
    this.formInit();
    this.itemUID = this.db.createId();
    this.categories = ['clothes', 'books', 'accessories', 'toys', 'crafts', 'others'];
    this.sub = this.store.select(getUser).subscribe( user => this.user = user);
  }

  private formInit() {
    this.itemForm = new FormGroup({
      name: new FormControl('Name', Validators.required),
      category: new FormControl('others', Validators.required),
      desc: new FormControl('your description goes here', [Validators.required, Validators.maxLength(55)]),
      price: new FormControl(1, Validators.required)
    });
  }

  addPhoto(link: string, idx: number) {
    this.photos[idx] = link;
  }

  onSubmit() {
    const newItem: Item = {
      uid: this.itemUID,
      ...this.itemForm.value,
      posted: new Date(),
      status: 'active',
      photos: this.photos,
      owner: this.user.uid,
      town: this.user.town
    };

    this.store.dispatch( new ItemActions.CreateItem(newItem));

    this.loading = true;
  }

  onCancel() {
    this.formInit();
    this.photos.forEach( (photo, idx) => this.afs.ref(`/items/${this.itemUID}/${idx}`).delete() );
    this.loc.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
