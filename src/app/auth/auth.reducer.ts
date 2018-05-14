import { Action } from '@ngrx/store';

import { User } from './user.model';

import { AuthActions, SET_USER, UNSET_USER } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  loggedUser: User;
}

const initialState: State = {
  isAuthenticated: null,
  loggedUser: null
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_USER:
      return {
        isAuthenticated: true,
        loggedUser: action.payload
      };
    case UNSET_USER:
      return {
        isAuthenticated: false,
        loggedUser: null
      };
    default: {
      return state;
    }
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;

export const getLoggedUser = (state: State) => state.loggedUser;
