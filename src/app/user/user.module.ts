import { NgModule } from '@angular/core';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { SharedModule } from './../shared/shared.module';
import { ItemModule } from './../item/item.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { CropComponent } from './crop/crop.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        UserComponent,
        CropComponent,
        ImageCropperComponent
    ],
    imports: [
        SharedModule,
        UserRoutingModule,
        ReactiveFormsModule,
        ItemModule
    ],
    exports: [],
    providers: [],
    entryComponents: [CropComponent]
})
export class UserModule { }
