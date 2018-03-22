import { Action } from '@ngrx/store';

export const SET_AUTH = '[Auth] Set Authenticated';
export const SET_UNAUTH = '[Auth] Set Unauthenticated';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTH;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTH;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
