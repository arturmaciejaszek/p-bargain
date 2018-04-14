import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { BargainsComponent } from './bargains.component';
import { BargainsRoutingModule } from './bargains-routing.module';

@NgModule({
    declarations: [
        BargainsComponent
    ],
    imports: [
        SharedModule,
        BargainsRoutingModule
    ],
    exports: [],
    providers: [],
})
export class BargainsModule { }
