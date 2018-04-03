import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './shop.component';

import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ItemModule } from './../item/item.module';
import { FilterComponent } from './filter/filter.component';

@NgModule({
    declarations: [
        ShopComponent,
        FilterComponent
    ],
    imports: [
        SharedModule,
        ItemModule,
        ShopRoutingModule,
        ReactiveFormsModule,
    ],
    exports: [],
    providers: [],
})
export class ShopModule { }
