import { ChatService } from './../bargains/chat/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireStorage } from 'angularfire2/storage';
import { Store } from '@ngrx/store';

import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import * as fromRoot from '../app.reducer';
import * as ItemActions from '../item/item.actions';
import { UnsetUser } from '../auth/auth.actions';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  isAuth$: Observable<boolean>;
  photoURL$: Observable<string>;
  user: User;
  userSub: Subscription;

  constructor(private store: Store<fromRoot.State>,
    private authService: AuthService,
    private chatService: ChatService,
    private afs: AngularFireStorage,
    private router: Router) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    this.userSub = this.store.select(fromRoot.getUser).subscribe(user => {
      if (user) {
        this.user = user;
        if (user.photoURL !== './assets/img/thumb-anon.jpg') {
          this.photoURL$ = this.afs.ref(`/users/${this.user.uid}/thumb.jpg`).getDownloadURL();
        }
        this.chatService.getUnreadThreadsCount();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  onLogout() {
    this.authService.logout()
    .then(_ => {
      this.store.dispatch(new ItemActions.ResetState());
    })
    .catch( err => console.log(err));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
