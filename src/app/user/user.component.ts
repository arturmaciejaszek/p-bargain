import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { MatDialog } from '@angular/material';

import { CropComponent } from './crop/crop.component';
import { AuthService } from '../auth/auth.service';
import { User } from './../auth/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.user$.subscribe( (user: User) => this.user = user);
  }

  uploadPhoto(event) {
    this.dialog.open(CropComponent, {data: {
      file: event.target.files[0],
      uid: this.user.uid
    }});
  }


}
