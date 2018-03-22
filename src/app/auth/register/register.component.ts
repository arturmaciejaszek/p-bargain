import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthData } from './../auth-data.model';
import { AuthService } from './../auth.service';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading$: Observable<boolean>;
  regForm: FormGroup;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.formInit();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSubmit() {
    const auth: AuthData = {
      email: this.regForm.value.email,
      password: this.regForm.value.password,
    };
    const name = this.regForm.value.name;

    this.authService.register(auth, name);
  }

  private formInit() {
    this.regForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      cPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      terms: new FormControl('', {
        validators: Validators.requiredTrue
      })
    }, this.passwordValidator);
  }

  private passwordValidator(form: FormGroup) {
    return form.get('password').value === form.get('cPassword').value ? null : {'mismatch': true};
  }

}
