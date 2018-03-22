import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SharedModule } from './../shared/shared.module';

import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AuthComponent,
        RegisterComponent,
        LoginComponent,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireAuthModule
    ],
    exports: [],
    providers: [],
})
export class AuthModule { }
