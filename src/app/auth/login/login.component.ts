import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { AuthData } from './../auth-data.model';
import { AuthService } from './../auth.service';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() regEmitter = new EventEmitter<void>();
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value);
  }

  emitRegCall() {
    this.regEmitter.emit();
  }
}
