import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {} from '@types/googlemaps';

import * as fromItem from '../item/item.reducer';
import * as ItemActions from '../item/item.actions';

import { ChatService } from './../bargains/chat/chat.service';
import { PromptComponent } from './../shared/prompt/prompt.component';
import { CropComponent } from './crop/crop.component';
import { AuthService } from '../auth/auth.service';
import { User } from './../auth/user.model';
import { Item } from './../item/item.model';
import { getUser, getIsLoading } from '../app.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('townInput') townInput: ElementRef;
  @ViewChild('paginator') tablePaginator: MatPaginator;
  @ViewChild('height') tableHeight: ElementRef;
  isLoading$: Observable<boolean>;
  user: User;
  sub: Subscription[] = [];
  townControl: FormControl;
  userItems = new MatTableDataSource<Item>();
  displayedColumns = ['name', 'price', 'action'];

  constructor(
    private authService: AuthService,
    private store: Store<fromItem.State>,
    private dialog: MatDialog,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);

    this.sub.push(
      this.store.select(getUser).subscribe((user: User) => {
        if (user && user.uid) {
          this.user = user;
          this.getUserItems();
        }
      })
    );

    this.sub.push(
      this.store
        .select(fromItem.selectAll)
        .subscribe((res: Item[]) => (this.userItems.data = res))
    );

    this.userItems.paginator = this.tablePaginator;

    this.townControl = new FormControl();

    const autocomplete = new google.maps.places.Autocomplete(
      this.townInput.nativeElement,
      { types: ['(cities)'] }
    );

    autocomplete.addListener('place_changed', () => {
      const town = autocomplete.getPlace();
      this.authService.updateData(this.user.uid, {
        town:
          town.address_components[0].short_name +
          ', ' +
          town.address_components[3].short_name
      });
    });
  }

  getItemsPerPage(): number {
    const tableHeight = this.tableHeight.nativeElement.clientHeight;
    if (tableHeight > 550) {
      return 10;
    } else if (tableHeight < 380) {
      return 3;
    } else {
      return 5;
    }
  }

  trackByFn(index: number, item: Item) {
    return index;
  }

  uploadPhoto(event) {
    this.dialog.open(CropComponent, {
      data: {
        file: event.target.files[0],
        uid: this.user.uid
      }
    });
  }

  updateFastBuy(event: any) {
    this.authService.updateData(this.user.uid, { fastBuy: event.value });
  }

  getUserItems() {
    this.store.dispatch(new ItemActions.FetchData({ ownerUID: this.user.uid }));
  }

  deleteItem(item: Item) {
    const dialogRef = this.dialog.open(PromptComponent);

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new ItemActions.DeleteItem(item));
        }
      });
  }

  openBargain(item: Item) {
    this.chatService.activeChat$.next(item);
    this.router.navigate([`/bargains`]);
  }

  ngOnDestroy() {
    this.sub.forEach(sub => sub.unsubscribe());
  }
}
