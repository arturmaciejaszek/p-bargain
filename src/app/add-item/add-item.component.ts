import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from './../auth/auth.service';
import { Item } from './../item/item.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  categories: string[];
  itemUID: string;
  owner: string;
  sub: Subscription;
  photos: string[] = [];

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  ngOnInit() {
    this.formInit();
    this.itemUID = this.db.createId();
    this.categories = ['clothes', 'books', 'accessories', 'toys', 'crafts', 'others'];
    this.sub = this.authService.user$.subscribe( user => this.owner = user.uid);
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

    // THIS SHOULD BE HANDLED BY STORE DISPATCH AS A CRUD EFFECT ACTION (or not? its the only place where create will be called)

    this.db.collection('items').doc(newItem.uid).set(newItem);

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
