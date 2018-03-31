import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import {} from '@types/googlemaps';

import * as fromItem from '../item/item.reducer';
import * as ItemActions from '../item/item.actions';

import { CropComponent } from './crop/crop.component';
import { AuthService } from '../auth/auth.service';
import { User } from './../auth/user.model';
import { Item } from './../item/item.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('townInput') townInput: ElementRef;
  user: User;
  sub: Subscription;
  townControl: FormControl;
  userItems = new MatTableDataSource<Item>();
  displayedColumns = ['name', 'price', 'status'];

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private db: AngularFirestore,
              private store: Store<fromItem.State>) { }

  ngOnInit() {
    this.authService.user$.subscribe( (user: User) => {
      this.user = user;
      this.getUserItems();
    });

    this.sub = this.store.select(fromItem.selectAll).subscribe( (res: Item[]) => this.userItems.data = res);

    this.townControl = new FormControl();

    const autocomplete = new google.maps.places.Autocomplete(this.townInput.nativeElement, {types: ['(cities)'] });

    autocomplete.addListener('place_changed', () => {
      const town = autocomplete.getPlace();
      this.authService.updateData(this.user.uid, {
        town: town.address_components[0].short_name + ', ' + town.address_components[3].short_name
      });
    });

  }

  uploadPhoto(event) {
    this.dialog.open(CropComponent, {data: {
      file: event.target.files[0],
      uid: this.user.uid
    }});
  }

  updateFastBuy(event: any) {
    this.authService.updateData(this.user.uid, {fastBuy: event.value});
  }

  getUserItems() {
    this.store.dispatch(new ItemActions.FetchData(this.user.uid));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
