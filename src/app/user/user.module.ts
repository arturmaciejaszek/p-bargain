import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';

import { SharedModule } from './../shared/shared.module';
import { ItemModule } from './../item/item.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { CropComponent } from './crop/crop.component';
import { PromptComponent } from './../shared/prompt/prompt.component';

@NgModule({
    declarations: [
        UserComponent,
        CropComponent,
    ],
    imports: [
        SharedModule,
        UserRoutingModule,
        ReactiveFormsModule,
        ImageCropperModule,
        ItemModule
    ],
    exports: [],
    providers: [],
    entryComponents: [CropComponent, PromptComponent]
})
export class UserModule { }
