import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as fromRoot from '../app.reducer';
import { StartLoading, StopLoading } from './../shared/ui.actions';
import { SetAuthenticated, SetUnauthenticated } from './auth.actions';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
    user$: Observable<User>;

    constructor(private af: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router,
        private store: Store<fromRoot.State>) {

            this.authMonitor();
        }

    authMonitor() {
        this.user$ = this.af.authState.switchMap( user => {
            if (user) {
                this.store.dispatch(new SetAuthenticated());
                return this.db.doc<any>(`users/${user.uid}`).valueChanges();
            } else {
                this.store.dispatch(new SetUnauthenticated());
                return Observable.of(null);
            }
        });
    }

    register(authData: AuthData, name: string) {
        this.store.dispatch(new StartLoading());
        this.af.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then( user => {
                console.log(user);
                this.setData(user, name);
                this.store.dispatch(new StopLoading());
            })
            .catch( err => console.log(err));
    }

    login(authData: AuthData) {
        this.store.dispatch(new StartLoading());
        this.af.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then( user => this.store.dispatch(new StopLoading()))
            .catch( err => console.log(err));
    }

    setData(user: any, name: string) {
        const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
        const newData = {
            name: name,
            uid: user.uid,
            email: user.email
        };
        userRef.set(newData, {merge: true});
    }

    logout() {
        this.af.auth.signOut();
        this.router.navigate(['/']);
    }

}
