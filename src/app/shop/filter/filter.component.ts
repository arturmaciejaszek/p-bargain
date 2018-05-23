import { SetShopData } from './../../item/item.actions';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import {} from '@types/googlemaps';

import * as fromItem from '../../item/item.reducer';
import * as ItemActions from '../../item/item.actions';
import { AuthService } from './../../auth/auth.service';
import { ItemQuery } from './../../item/item-query.model';
import { getUser } from '../../app.reducer';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @ViewChild('townInput') townInput: ElementRef;
  townControl: FormControl;
  selectedTown = '';
  categories: string[];
  query: ItemQuery = {};

  constructor(private store: Store<fromItem.State>) {}

  ngOnInit() {
    this.townControl = new FormControl();

    this.setCategories();

    this.getUserData();

    this.setGoogleAutocomplete();
  }

  getUserData() {
    this.store
      .select(getUser)
      .pipe(take(2))
      .subscribe(user => {
        if (user) {
          this.selectedTown = user.town;
          this.query.town = user.town;
          this.fetchItems();
        }
      });
  }

  setCategories() {
    this.categories = [
      'clothes',
      'books',
      'accessories',
      'toys',
      'crafts',
      'others'
    ];
  }

  setGoogleAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.townInput.nativeElement,
      { types: ['(cities)'] }
    );

    autocomplete.addListener('place_changed', () => {
      const town = autocomplete.getPlace();
      this.selectedTown =
        town.address_components[0].short_name +
        ', ' +
        town.address_components[3].short_name;
      this.query.town = this.selectedTown;
      this.fetchItems();
    });
  }

  switchCategory(event) {
    this.query.category = event.value;
    this.fetchItems();
  }

  fetchItems() {
    this.store.dispatch(new ItemActions.FetchData(this.query));
  }
}
