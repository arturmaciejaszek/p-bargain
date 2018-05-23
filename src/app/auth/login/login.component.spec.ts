import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NgForm } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { AuthService } from './../auth.service';
import { SharedModule } from './../../shared/shared.module';
import { LoginComponent } from './login.component';
import * as fromRoot from '../../app.reducer';

describe('Component: LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<fromRoot.State>;
  let authServiceSpy: any;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        StoreModule.forRoot(fromRoot.reducers)
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'pipe').and.returnValue(of(false));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the button if the store is not loading', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should send the login form upon calling onSubmit', () => {
    const mockform = new NgForm([], []);
    component.onSubmit(mockform);
    expect(authServiceSpy.login).toHaveBeenCalledWith(mockform.value);
  });

  it('should emit a registration trigger on click', () => {
    const emitSpy = spyOn(component.regEmitter, 'emit');
    const regAnchor = fixture.nativeElement.querySelector('a');
    regAnchor.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
  });
});
