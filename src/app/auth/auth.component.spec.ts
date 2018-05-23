import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { Store, StoreModule } from '@ngrx/store';

import * as fromRoot from '../app.reducer';

describe('Component: AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    const authService = jasmine.createSpyObj('AuthService', ['']);
    TestBed.configureTestingModule({
      declarations: [AuthComponent, LoginComponent, RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        StoreModule.forRoot(fromRoot.reducers)
      ],
      providers: [{ provide: AuthService, useValue: authService }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show registration form if hasAnAccount property is set to false', () => {
    component.hasAnAccount = false;
    fixture.detectChanges();
    const h2Tag = fixture.nativeElement.querySelector('h2');
    expect(h2Tag.textContent).toContain('Register:');
  });
});
