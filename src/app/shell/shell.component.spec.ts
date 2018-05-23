import { AngularFireStorage } from 'angularfire2/storage';
import { MatSnackBar } from '@angular/material';
import { ChatService } from './../bargains/chat/chat.service';
import { AuthService } from './../auth/auth.service';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './../shared/material.module';
import { of } from 'rxjs';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { Router } from '@angular/router';
import * as fromRoot from '../app.reducer';
import { ResetState } from './../item/item.actions';
import { User } from '../auth/user.model';
import { mockUser } from '../mocks';

describe('Component: ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  let store: Store<fromRoot.State>;
  let afs, chatService, authService, snackBar: jasmine.Spy;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    chatService = jasmine.createSpyObj('ChatService', [
      'getUnreadThreadsCount'
    ]);
    afs = jasmine.createSpyObj('AngularFireStorage', ['ref', 'getDownloadURL']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ShellComponent],
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot(fromRoot.reducers)
      ],
      providers: [
        ChatService,
        { provide: AuthService, useValue: authService },
        { provide: ChatService, useValue: chatService },
        { provide: AngularFireStorage, useValue: afs },
        { provide: MatSnackBar, useValue: snackBar }
      ]
    });
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to landing page if the user is not defined', () => {
    const router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    spyOn(store, 'pipe').and.returnValue(of(null));
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledWith(['/']);
  });

  it('should receive an user from the Store', () => {
    spyOn(store, 'pipe').and.returnValue(of(mockUser));
    fixture.detectChanges();
    expect(component.user).toEqual(mockUser);
  });

  it('should fetch photoURL if its different than default', () => {
    spyOn(store, 'pipe').and.returnValue(of(mockUser));
    const thumbFetch = spyOn(component, 'getUsersThumb');
    fixture.detectChanges();
    expect(thumbFetch).toHaveBeenCalled();
  });

  it('should call get Threads method via chatService', () => {
    spyOn(store, 'pipe').and.returnValue(of(mockUser));
    fixture.detectChanges();
    expect(chatService.getUnreadThreadsCount).toHaveBeenCalled();
  });

  it('should get unread thread count from Store', () => {
    spyOn(store, 'pipe').and.returnValue(of(15));
    fixture.detectChanges();
    component.unreadCount$.subscribe(res => {
      expect(res).toEqual(15);
    });
  });

  it(
    'should clear local user property on logout',
    fakeAsync(() => {
      authService.logout.and.returnValue(Promise.resolve(true));
      component.user = mockUser;
      component.onLogout();
      tick();
      fixture.detectChanges();
      expect(component.user).toEqual(null);
    })
  );

  it(
    'should dispatch resetState',
    fakeAsync(() => {
      authService.logout.and.returnValue(Promise.resolve(true));
      spyOn(store, 'dispatch').and.callThrough();
      const action = new ResetState();

      component.onLogout();
      tick();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    })
  );

  it('should open snackBar on error', fakeAsync(() => {}));
});
