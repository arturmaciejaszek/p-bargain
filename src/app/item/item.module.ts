import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { PromptComponent } from './../shared/prompt/prompt.component';
import { SharedModule } from './../shared/shared.module';
import { ItemComponent } from './item.component';
import { ItemEffects } from './item.effects';
import { itemReducer, metaReducer, reducerForAoT } from './item.reducer';

@NgModule({
  declarations: [ItemComponent, PromptComponent],
  imports: [
    SharedModule,
    SwiperModule,
    EffectsModule.forFeature([ItemEffects]),
    StoreModule.forFeature('item', reducerForAoT)
  ],
  exports: [ItemComponent, PromptComponent],
  entryComponents: [PromptComponent]
})
export class ItemModule {}
