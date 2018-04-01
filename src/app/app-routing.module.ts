import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { AuthReverseGuard } from './auth/auth-reverse.guard';

const routes: Routes = [
  // { path: '', component: WelcomeComponent, pathMatch: 'full'},
  { path: 'shop', loadChildren: './shop/shop.module#ShopModule', canLoad: [AuthGuard]},
  { path: 'auth', component: AuthComponent, canActivate: [AuthReverseGuard]},
  { path: 'profile', loadChildren: './user/user.module#UserModule', canLoad: [AuthGuard]},
  { path: 'add', loadChildren: './add-item/add-item.module#AddItemModule', canLoad: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthReverseGuard]
})
export class AppRoutingModule {}
