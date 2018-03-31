import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Store } from '@ngrx/store';

import * as fromItem from '../item/item.reducer';
import * as ItemActions from '../item/item.actions';
import { AuthService } from './../auth/auth.service';
import { Item } from './../item/item.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  categories: string[];
  itemUID: string;
  owner: string;
  ownerItems: string[];
  sub: Subscription;
  photos: string[] = [];

  constructor(private db: AngularFirestore,
    private authService: AuthService,
    private afs: AngularFireStorage,
    private loc: Location,
    private store: Store<fromItem.State>) { }

  ngOnInit() {
    this.formInit();
    this.itemUID = this.db.createId();
    this.categories = ['clothes', 'books', 'accessories', 'toys', 'crafts', 'others'];
    this.sub = this.authService.user$.subscribe( user => {
      this.owner = user.uid;
      this.ownerItems = user.items;
    });
  }

  private formInit() {
    this.itemForm = new FormGroup({
      name: new FormControl('Name', Validators.required),
      category: new FormControl('others', Validators.required),
      desc: new FormControl('your description goes here', Validators.required),
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
      owner: this.owner
    };

    this.store.dispatch( new ItemActions.CreateItem(newItem));

    // this.itemService.createItem(newItem.uid, newItem)
    //   .then(_ => {
    //     const newItems = [...this.ownerItems, newItem.uid];
    //     this.authService.updateData(this.owner, {items: newItems});
    //     this.loc.back();
    //   })
    //   .catch( err => console.log(err));

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
