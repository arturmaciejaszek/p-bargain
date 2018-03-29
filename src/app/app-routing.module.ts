import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  // { path: '', component: ShellTabsComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent},
  { path: 'profile', loadChildren: './user/user.module#UserModule', canLoad: [AuthGuard]},
  { path: 'add', loadChildren: './add-item/add-item.module#AddItemModule', canLoad: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
