import { NgModule } from '@angular/core';

import { ItemModule } from './../item/item.module';
import { SharedModule } from './../shared/shared.module';
import { BargainsComponent } from './bargains.component';
import { BargainsRoutingModule } from './bargains-routing.module';
import { BSorterPipe } from './b-sorter.pipe';
import { ChatComponent } from './chat/chat.component';
import { BargainItemComponent } from './bargain-item/bargain-item.component';
import { FilterPipePipe } from './filter-pipe.pipe';

@NgModule({
    declarations: [
        BargainsComponent,
        BSorterPipe,
        ChatComponent,
        BargainItemComponent,
        FilterPipePipe,
    ],
    imports: [
        SharedModule,
        BargainsRoutingModule,
        ItemModule
    ],
    exports: [],
    providers: [],
})
export class BargainsModule { }
