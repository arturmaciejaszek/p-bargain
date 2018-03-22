import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from './shared/shared.module';

import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { reducers } from './app.reducer';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
