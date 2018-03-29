import { AddItemRoutingModule } from './add-item-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemModule } from './../item/item.module';
import { AddItemComponent } from './add-item.component';
import { SharedModule } from '../shared/shared.module';
import { DropZoneDirective } from './dropzone/drop-zone.directive';
import { DropzoneComponent } from './dropzone/dropzone.component';

@NgModule({
    declarations: [
        AddItemComponent,
        DropZoneDirective,
        DropzoneComponent
    ],
    imports: [
        SharedModule,
        ItemModule,
        ReactiveFormsModule,
        AddItemRoutingModule
    ],
})
export class AddItemModule { }
