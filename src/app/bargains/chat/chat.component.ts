import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators';

import { User } from '../../auth/user.model';
import { Bargain } from './../bargain.model';
import { Message } from './message.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() loggedUser: User;
  @ViewChild('msg') msgInput: ElementRef;
  @ViewChildren('msgs') msgsList: QueryList<any>;
  currentBargain: Bargain;
  recipientUID: string;
  msgs$: Observable<Message[]>;
  sub: Subscription[] = [];


  constructor(private chatService: ChatService, private db: AngularFirestore) { }

  ngOnInit() {
    this.sub.push(this.chatService.activeChat$.subscribe( (bargain: Bargain) => {
      if (bargain) {
        this.currentBargain = bargain;
        this.setRecipient(bargain);
        this.msgs$ = this.db.collection<Message>(`/bargains/${this.currentBargain.uid}/messages`).valueChanges();
      }
    }));
  }

  sendMsg(msg: string) {
    this.chatService.sendMsg(this.currentBargain.uid, this.loggedUser.uid, msg)
      .then(_ => this.db.doc<Bargain>(`/bargains/${this.currentBargain.uid}`)
                        .update({hasUnread: this.recipientUID}))
      .catch( err => console.log(err));
    this.msgInput.nativeElement.value = '';
  }

  seenUpdater() {
      const unseenMsgs = this.db.collection<Message>(`/bargains/${this.currentBargain.uid}/messages`,
        ref => ref.where('seen', '==', false).where('user', '==', this.recipientUID));

      this.sub.push(unseenMsgs.snapshotChanges().subscribe( actions => {
        const createBatch = this.db.firestore.batch();
        actions.forEach( action => {
          const msgRef = this.db.doc<Message>(`/bargains/${this.currentBargain.uid}/messages/${action.payload.doc.id}`).ref;
          createBatch.update(msgRef, {seen: true});
        });
        createBatch.commit()
          .then(_ => this.db.doc<Bargain>(`/bargains/${this.currentBargain.uid}`).update({hasUnread: null}))
          .catch(err => console.log(err));
      }));
  }

  setRecipient(bargain: Bargain) {
    if (bargain.owner === this.loggedUser.uid) {
      this.recipientUID = bargain.buyer;
    } else {
      this.recipientUID = bargain.owner;
    }
  }

  ngAfterViewInit() {
    this.sub.push(this.msgsList.changes.subscribe( () => {
      this.seenUpdater();
    }));
  }

  ngOnDestroy() {
   this.sub.forEach( sub => sub.unsubscribe());
  }

}
