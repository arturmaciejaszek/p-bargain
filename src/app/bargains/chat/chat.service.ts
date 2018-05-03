import { getAuthState } from './../../app.reducer';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';

import { Bargain } from './../bargain.model';
import { Message } from './message.model';
import * as fromRoot from '../../app.reducer';
import { SetUnread } from './../../shared/ui.actions';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ChatService {
    activeChat$: BehaviorSubject<Bargain> = new BehaviorSubject<Bargain>(null);

    constructor(private db: AngularFirestore, private store: Store<fromRoot.State>) {
    }

    updateBargain(bargainUID: string, hasUnread?: string | null) {
        const bargainRef = this.db.doc<Bargain>(`/bargains/${bargainUID}`).ref;
        return bargainRef.update({hasUnread: hasUnread });
    }


    getUnreadThreadsCount() {
        this.store.select(fromRoot.getAuthState).subscribe( state => {
            if (state.isAuthenticated) {
                this.db.collection('/bargains', ref => ref.where('hasUnread', '==', state.loggedUser.uid) )
                    .valueChanges()
                    .subscribe( col => this.store.dispatch(new SetUnread(col.length)));
            }
        });

    }

    sendMsg(bargain: string, user: string, msg: string) {
        const data: Message = {
            user: user,
            msg: msg,
            sentAt: new Date(),
            seen: false
        };
        return this.db.collection(`/bargains/${bargain}/messages`).add(data);
    }

    setToSeen(bargain: string, msgUID: string) {
        this.db.doc(`/bargains/${bargain}/messages/${msgUID}`).update({seen: true});
    }

}
