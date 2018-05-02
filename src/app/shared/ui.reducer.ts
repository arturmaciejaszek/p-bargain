import { Action } from '@ngrx/store';

import { UIActions, START_LOADING, STOP_LOADING, SET_UNREAD_THREADS } from './ui.actions';

export interface State {
  isLoading: boolean;
  unreadThreads: number;
}

const initialState: State = {
  isLoading: false,
  unreadThreads: 0
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case SET_UNREAD_THREADS:
      return {
        ...state,
        unreadThreads: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;

export const getUnreadThreads = (state: State) => state.unreadThreads;
