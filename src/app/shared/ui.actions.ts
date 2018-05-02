import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

export const SET_UNREAD_THREADS = '[UI] Set Unread Threads';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class SetUnread implements Action {
  readonly type = SET_UNREAD_THREADS;

  constructor(public payload: number) {}
}

export type UIActions = StartLoading | StopLoading | SetUnread ;
