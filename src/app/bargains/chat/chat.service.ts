import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';

import { Bargain } from './../bargain.model';
import * as fromRoot from '../../app.reducer';
import { SetUnread } from './../../shared/ui.actions';

@Injectable()
export class ChatService {

    constructor(private db: AngularFirestore, private store: Store<fromRoot.State>) {
    }

    updateBargain(bargainUID: string, hasUnread?: boolean) {
        const bargainRef = this.db.doc<Bargain>(`/bargains/${bargainUID}`).ref;
        return bargainRef.update({...bargainRef, hasUnread: hasUnread });
    }

    getUnreadThreadsCount() {
        this.store.select(fromRoot.getIsAuth).subscribe( auth => {
            if (auth) {
                this.db.collection('/bargains', ref => ref.where('hasUnread', '==', true) )
                    .valueChanges()
                    .subscribe( col => this.store.dispatch(new SetUnread(col.length)));
            }
        });

    }

}
