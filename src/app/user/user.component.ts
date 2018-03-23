import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import {} from '@types/googlemaps';


import { CropComponent } from './crop/crop.component';
import { AuthService } from '../auth/auth.service';
import { User } from './../auth/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('townInput') townInput: ElementRef;
  user: User;
  townControl: FormControl;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.user$.subscribe( (user: User) => this.user = user);

    this.townControl = new FormControl();

    const autocomplete = new google.maps.places.Autocomplete(this.townInput.nativeElement, {types: ['(cities)'] });

    autocomplete.addListener('place_changed', () => {
      const town = autocomplete.getPlace();
      console.log(town);
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

}
