import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Route } from '@angular/router';
import { take } from 'rxjs/operators';

import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromRoot.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}
