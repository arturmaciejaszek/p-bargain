import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from './shared/shared.module';

import { ShellModule } from './shell/shell.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { reducers } from './app.reducer';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { AuthComponent } from './auth/auth.component';
import { ShellTabsComponent } from './shell/shell-tabs/shell-tabs.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShellModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
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
