import { Action } from '@ngrx/store';
import { Item } from './item.model';
import { ItemQuery } from './item-query.model';

export const FETCH_DATA = '[Item] Fetch Data';
export const FETCH_DATA_SUCCESS = '[Item] Fetch Data Success';

export const CREATE_ITEM = '[Item] Create Item';
export const UPDATE_ITEM = '[Item] Update Item';
export const DELETE_ITEM = '[Item] Delete Item';

export const CALL_SUCCESS = '[Item] Call Success';
export const CALL_FAILURE = '[Item] Call Failure';

export class FetchData implements Action {
    readonly type = FETCH_DATA;

    constructor(public payload: ItemQuery) {}
}

export class CreateItem implements Action {
    readonly type = CREATE_ITEM;

    constructor(public payload: Item) {}
}

export class UpdateItem implements Action {
    readonly type = UPDATE_ITEM;

    constructor(public payload: {uid: string, changes: Partial<Item>}) {}
}

export class DeleteItem implements Action {
    readonly type = DELETE_ITEM;

    constructor(public payload: Item) {}
}

export class FetchDataSuccess implements Action {
    readonly type = FETCH_DATA_SUCCESS;

    constructor(public payload?: any) {}
}

export class CallSuccess implements Action {
    readonly type = CALL_SUCCESS;

    constructor(public payload?: any) {}
}

export class CallFailure implements Action {
    readonly type = CALL_FAILURE;

    constructor(public payload?: any) {}
}

export type All
  = FetchData
  | CreateItem
  | UpdateItem
  | DeleteItem
  | FetchDataSuccess
  | CallSuccess
  | CallFailure;
