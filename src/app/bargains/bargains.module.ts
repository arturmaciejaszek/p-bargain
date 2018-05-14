import { NgModule } from '@angular/core';

import { ItemModule } from './../item/item.module';
import { SharedModule } from './../shared/shared.module';
import { BargainsComponent } from './bargains.component';
import { BargainsRoutingModule } from './bargains-routing.module';
import { BSorterPipe } from './b-sorter.pipe';
import { ChatComponent } from './chat/chat.component';
import { BargainItemComponent } from './bargain-item/bargain-item.component';
import { FilterPipePipe } from './filter-pipe.pipe';
import { OrderByPipe } from './chat/order-by.pipe';
import { BargainsMobileComponent } from './bargains-mobile/bargains-mobile.component';

@NgModule({
  declarations: [
    BargainsComponent,
    BSorterPipe,
    ChatComponent,
    BargainItemComponent,
    FilterPipePipe,
    OrderByPipe,
    BargainsMobileComponent
  ],
  imports: [SharedModule, BargainsRoutingModule, ItemModule],
  exports: [],
  providers: [],
  entryComponents: [BargainsMobileComponent]
})
export class BargainsModule {}
