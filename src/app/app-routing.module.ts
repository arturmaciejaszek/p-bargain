import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { AuthReverseGuard } from './auth/auth-reverse.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'auth', component: AuthComponent, canActivate: [AuthReverseGuard] },
  {
    path: 'shop',
    loadChildren: './shop/shop.module#ShopModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './user/user.module#UserModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'bargains',
    loadChildren: './bargains/bargains.module#BargainsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'add',
    loadChildren: './add-item/add-item.module#AddItemModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthReverseGuard]
})
export class AppRoutingModule {}
