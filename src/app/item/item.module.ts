import { NgModule } from '@angular/core';
import { DragScrollModule } from 'ngx-drag-scroll';

import { SharedModule } from './../shared/shared.module';
import { ItemComponent } from './item.component';

@NgModule({
    declarations: [
        ItemComponent
    ],
    imports: [
        SharedModule,
        DragScrollModule,
    ],
    exports: [
        ItemComponent
    ]
})
export class ItemModule {}
