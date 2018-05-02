import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { User } from '../../auth/user.model';
import { Item } from './../../item/item.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() loggedUser: User;
  @Input() activeItem: Item;
  @ViewChild('msg') msgInput: ElementRef;

  constructor() { }

  sendMsg(msg: string) {
    console.log(msg);
    this.msgInput.nativeElement.value = '';
  }

  ngOnInit() {
  }

}
