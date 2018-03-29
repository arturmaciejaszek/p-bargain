import { ItemComponent } from './../item/item.component';
import { AppRoutingModule } from './../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddItemModule } from './../add-item/add-item.module';
import { SharedModule } from './../shared/shared.module';
import { AuthModule } from './../auth/auth.module';
import { ShellComponent } from './shell.component';


@NgModule({
    declarations: [
        ShellComponent,
    ],
    imports: [
        SharedModule,
        AuthModule,
        AppRoutingModule,
    ],
    exports: [
        ShellComponent
    ]
})
export class ShellModule {}
