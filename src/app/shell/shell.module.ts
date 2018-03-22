import { AppRoutingModule } from './../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AuthModule } from './../auth/auth.module';
import { ShellComponent } from './shell.component';
import { ShellTabsComponent } from './shell-tabs/shell-tabs.component';

@NgModule({
    declarations: [
        ShellComponent,
        ShellTabsComponent
    ],
    imports: [
        SharedModule,
        AuthModule,
        AppRoutingModule
    ],
    exports: [
        ShellComponent
    ]
})
export class ShellModule {}
