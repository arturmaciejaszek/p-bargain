import { Action } from '@ngrx/store';

import { AuthActions, SET_AUTH, SET_UNAUTH } from './auth.actions';

export interface State {
  isAuth: boolean;
}

const initialState: State = {
  isAuth: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTH:
      return {
        isAuth: true
      };
    case SET_UNAUTH:
      return {
        isAuth: false
      };
    default: {
      return state;
    }
  }
}

export const getisAuth = (state: State) => state.isAuth;
