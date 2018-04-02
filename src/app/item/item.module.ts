import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { SharedModule } from './../shared/shared.module';
import { ItemComponent } from './item.component';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './item.effects';
import { itemReducer } from './item.reducer';

@NgModule({
    declarations: [
        ItemComponent
    ],
    imports: [
        SharedModule,
        SwiperModule,
        EffectsModule.forFeature([ItemEffects]),
        StoreModule.forFeature('item', itemReducer)
    ],
    exports: [
        ItemComponent
    ]
})
export class ItemModule {}
