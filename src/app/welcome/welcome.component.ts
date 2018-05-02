import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from '../app.reducer';
import { getIsAuth } from './../app.reducer';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.select(getIsAuth).subscribe( auth => {
      if (auth) {
        this.router.navigate(['/shop']);
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }

}