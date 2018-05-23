import { AuthService } from './../auth.service';
import { StoreModule, Store } from '@ngrx/store';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import * as fromRoot from '../../app.reducer';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: Store<fromRoot.State>;
  let authServiceSpy: any;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forRoot(fromRoot.reducers)
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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

  it('should send the reg form upon calling onSubmit', () => {
    component.onSubmit();
    expect(authServiceSpy.register).toHaveBeenCalled();
  });

  it('form should not be valid on pass missmatch', () => {
    component.regForm.get('email').setValue('email@test.com');
    component.regForm.get('name').setValue('name');
    component.regForm.get('terms').setValue(true);

    component.regForm.get('password').setValue('password');
    component.regForm.get('cPassword').setValue('passwordd');
    fixture.detectChanges();
    expect(component.regForm.valid).toBe(false);
  });
});
