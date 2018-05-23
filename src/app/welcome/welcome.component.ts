import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from '../app.reducer';
import { getIsAuth } from './../app.reducer';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.pipe(select(getIsAuth)).subscribe(auth => {
      if (auth === false) {
        this.router.navigate(['/auth']);
      } else if (auth === true) {
        this.router.navigate(['/shop']);
      } else {
        return;
      }
    });
  }
}
