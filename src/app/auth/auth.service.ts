import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import * as fromRoot from '../app.reducer';
import { StartLoading, StopLoading } from './../shared/ui.actions';
import { SetUser, UnsetUser } from './auth.actions';

import { ErrorHandler } from './../shared/error-snackbar.service';
import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  constructor(
    private af: AngularFireAuth,
    private db: AngularFirestore,
    private store: Store<fromRoot.State>,
    private errorHandler: ErrorHandler
  ) {
    this.af.authState.subscribe(user => {
      if (user) {
        this.db
          .doc<any>(`users/${user.uid}`)
          .valueChanges()
          .subscribe((data: User) => this.store.dispatch(new SetUser(data)));
      } else {
        this.store.dispatch(new UnsetUser());
      }
    });
  }

  register(authData: AuthData, name: string) {
    this.store.dispatch(new StartLoading());
    this.af.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(user => {
        this.setData(user, name);
        this.store.dispatch(new StopLoading());
      })
      .catch(err => {
        this.errorHandler.show('failed to register', null);
        this.store.dispatch(new StopLoading());
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new StartLoading());
    this.af.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      // .then( user => {
      //     // this.store.dispatch(new StopLoading());
      // })
      .catch(err => {
        this.errorHandler.show('invalid credentials', null);
        this.store.dispatch(new StopLoading());
      });
  }

  setData(user: any, name: string) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `users/${user.uid}`
    );
    const newData = {
      name: name,
      uid: user.uid,
      email: user.email,
      photoURL: './assets/img/thumb-anon.jpg',
      fastBuy: false,
      town: '',
      rank: 0
    };
    userRef.set(newData, { merge: true });
  }

  updateData(uid: any, data: any): Promise<any> {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${uid}`);
    return userRef.update(data);
  }

  logout(): Promise<any> {
    return this.af.auth.signOut();
  }
}
