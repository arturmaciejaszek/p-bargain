import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperComponent } from 'ng2-img-cropper';

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
        ImageCropperComponent,
    ],
    imports: [
        SharedModule,
        UserRoutingModule,
        ReactiveFormsModule,
        ItemModule
    ],
    exports: [],
    providers: [],
    entryComponents: [CropComponent, PromptComponent]
})
export class UserModule { }
