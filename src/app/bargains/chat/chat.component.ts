import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators';

import { ErrorHandler } from './../../shared/error-snackbar.service';
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
  @ViewChildren('msgs') msgsList: QueryList<ElementRef>;
  currentBargain: Bargain;
  recipientUID: string;
  recipientPhoto: string;
  recipientName: string;
  msgs$: Observable<Message[]>;
  sub: Subscription[] = [];
  bDoc: AngularFirestoreDocument<any>;


  constructor(private chatService: ChatService, private db: AngularFirestore, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.sub.push(this.chatService.activeChat$.subscribe( (bargain: Bargain) => {
      if (bargain) {
        this.currentBargain = bargain;
        this.setRecipient(bargain);
        this.bDoc = this.db.doc(`/bargains/${this.currentBargain.uid}`);
        this.msgs$ = this.bDoc.collection<Message>('/messages').valueChanges();
      }
    }));
  }

  sendMsg(msg: string) {
    this.chatService.sendMsg(this.currentBargain.uid, this.loggedUser.uid, msg)
      .then(_ => this.bDoc.update({hasUnread: this.recipientUID}))
      .catch( err => this.errorHandler.show('failed to send a message', null));
    this.msgInput.nativeElement.value = '';
  }

  seenUpdater() {
      const unseenMsgs = this.bDoc.collection<Message>('/messages',
        ref => ref.where('seen', '==', false).where('user', '==', this.recipientUID));

      this.sub.push(unseenMsgs.snapshotChanges().subscribe( actions => {
        const createBatch = this.db.firestore.batch();
        actions.forEach( action => {
          const msgRef = this.bDoc.collection('messages').doc<Message>(`/${action.payload.doc.id}`).ref;
          createBatch.update(msgRef, {seen: true});
        });
        createBatch.commit()
          .then(_ => this.bDoc.update({hasUnread: null}))
          .catch(err => this.errorHandler.show('failed to update messages', null));
      }));
  }

  setRecipient(bargain: Bargain) {
    if (bargain.owner === this.loggedUser.uid) {
      this.recipientUID = bargain.buyer;
    } else {
      this.recipientUID = bargain.owner;
    }
    this.db.collection('users').doc<User>(this.recipientUID)
    .valueChanges()
    .pipe(take(1))
    .subscribe( user => {
      this.recipientPhoto = user.photoURL;
      this.recipientName = user.name;
    } );
  }

  ngAfterViewInit() {
    this.sub.push(this.msgsList.changes.subscribe( () => {
      this.seenUpdater();
      if (this.msgsList.last) {
        this.msgsList.last.nativeElement.scrollIntoView();
      }
    }));
  }

  ngOnDestroy() {
   this.sub.forEach( sub => sub.unsubscribe());
  }

}
