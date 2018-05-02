import { SharedModule } from './../shared/shared.module';
import { WelcomeComponent } from './welcome.component';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [SharedModule],
    declarations: [WelcomeComponent],
    exports: [WelcomeComponent],
    providers: [],
})
export class WelcomeModule { }
