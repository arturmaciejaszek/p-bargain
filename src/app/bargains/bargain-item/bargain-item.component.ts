import { ChatService } from './../chat/chat.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { Item } from '../../item/item.model';
import { User } from './../../auth/user.model';
import { Message } from './../chat/message.model';

@Component({
  selector: 'app-bargain-item',
  templateUrl: './bargain-item.component.html',
  styleUrls: ['./bargain-item.component.scss']
})
export class BargainItemComponent implements OnInit, OnDestroy {
  @Input() item: Item;
  @Input() expanded: boolean;
  @Input() loggedUser: User;
  @Output() openEmitter: EventEmitter<string> = new EventEmitter<string>();
  sub: Subscription;
  public unread = 0;

  constructor(private db: AngularFirestore,
    private store: Store<fromRoot.State>,
    private chatService: ChatService) { }

  ngOnInit() {
    this.sub = this.db.collection<Message>(`/bargains/${this.item.uid}/messages`)
      .valueChanges()
      .subscribe( (msgs: Message[]) => {
        this.unread = 0;
        msgs.forEach( (msg: Message) => {
          if (!msg.seen && msg.user !== this.loggedUser.uid) {
            this.unread ++;
          }
        });
        // if (this.unread > 0) {
        //   this.chatService.updateBargain(this.item.uid, this.loggedUser.uid);
        //   return;
        // }
      });
  }

  openChat() {
    this.chatService.activeChat$.next(this.item);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
