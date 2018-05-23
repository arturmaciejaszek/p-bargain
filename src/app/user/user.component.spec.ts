import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Store, StoreModule, select } from '@ngrx/store';
import { ImageCropperModule } from 'ng2-img-cropper';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ChatService } from './../bargains/chat/chat.service';
import { AuthService } from './../auth/auth.service';
import { SharedModule } from './../shared/shared.module';
import { UserComponent } from './user.component';
import { FetchData } from './../item/item.actions';

import * as fromRoot from '../app.reducer';
import * as fromItem from '../item/item.reducer';
import {} from '@types/googlemaps';
import { mockUser } from '../mocks';

describe('Component: UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let store: Store<fromItem.State>;
  let authServiceSpy, chatServiceSpy: any;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
    chatServiceSpy = jasmine.createSpyObj('ChatService', ['']);

    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ImageCropperModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          item: fromItem.reducerForAoT
        })
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ChatService, useValue: chatServiceSpy }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    spyOn(component, 'setGoogleMapsAutocomplete').and.returnValue(of(null));

    store = TestBed.get(Store);
    spyOn(store, 'pipe').and.returnValue(of(mockUser));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch Fetch Data Action', () => {
    spyOn(store, 'dispatch').and.callThrough();
    const action = new FetchData({ ownerUID: mockUser.uid });
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call uploadPhoto on image change', () => {
    const imgInput = fixture.debugElement.query(By.css('input[type=file]'));
    const uploadSpy = spyOn(component, 'uploadPhoto');
    const mockEvent = { event: 'anything' };
    imgInput.triggerEventHandler('change', mockEvent);
    fixture.detectChanges();
    expect(uploadSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should update buy type on radio change', () => {
    const radioBtn = fixture.debugElement.query(By.css('mat-radio-group'));
    const updateFastBuySpy = spyOn(component, 'updateFastBuy');
    radioBtn.triggerEventHandler('change', null);
    fixture.detectChanges();
    expect(updateFastBuySpy).toHaveBeenCalled();
  });
});
