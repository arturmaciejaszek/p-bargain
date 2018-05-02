import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[Auth] Set Logged User';
export const UNSET_USER = '[Auth] Unset Logged User';

export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload: User) {}
}

export class UnsetUser implements Action {
  readonly type = UNSET_USER;
}

export type AuthActions =  SetUser | UnsetUser;
