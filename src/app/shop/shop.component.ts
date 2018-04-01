import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromItem from '../item/item.reducer';
import * as ItemActions from '../item/item.actions';
import { ItemQuery } from './../item/item-query.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('townInput') townInput: ElementRef;
  townControl: FormControl;
  selectedTown = '';
  categories: string[];
  query: ItemQuery = { price: {} };

  constructor(private store: Store<fromItem.State>) { }

  ngOnInit() {

    this.townControl = new FormControl();

    const autocomplete = new google.maps.places.Autocomplete(this.townInput.nativeElement, {types: ['(cities)'] });

    autocomplete.addListener('place_changed', () => {
      const town = autocomplete.getPlace();
      this.selectedTown = town.address_components[0].short_name + ', ' + town.address_components[3].short_name;
      this.query.town = this.selectedTown;
      this.fetchItems();
    });

    this.categories = ['clothes', 'books', 'accessories', 'toys', 'crafts', 'others'];

  }

  switchCategory(event) {
    this.query.category = event.value;
    this.fetchItems();
  }

  switchMinPrice(event) {
    this.query.price.minPrice = event.value;
    this.fetchItems();
  }

  switchMaxPrice(event) {
    this.query.price.maxPrice = event.value;
    this.fetchItems();
  }

  fetchItems() {
    this.store.dispatch( new ItemActions.FetchData(this.query));
  }

}
