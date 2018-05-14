import { Observable } from 'rxjs/observable';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { User } from '../../auth/user.model';
import { Item } from '../../item/item.model';

@Component({
  selector: 'app-bargains-mobile',
  templateUrl: './bargains-mobile.component.html',
  styleUrls: ['./bargains-mobile.component.scss']
})
export class BargainsMobileComponent implements OnInit {
  public loggedUser: User;
  data$: Observable<Item[]>;
  loading$: Observable<boolean>;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<any>
  ) {
    this.data$ = data.bargains;
    this.loggedUser = data.loggedUser;
    this.loading$ = data.loading;
  }

  ngOnInit() {}

  return() {
    this.bottomSheetRef.dismiss();
  }
}
