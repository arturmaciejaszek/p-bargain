import { Action } from '@ngrx/store';

import { Item } from './item.model';

export const CREATE_ITEM = '[Item] Create Item';
export const UPDATE_ITEM = '[Item] Update Item';
export const DELETE_ITEM = '[Item] Delete Item';

export class CreateItem implements Action {
  readonly type = CREATE_ITEM;

  constructor(public payload: Item) {}
}

export class UpdateItem implements Action {
    readonly type = UPDATE_ITEM;

    constructor(public payload: {
        uid: string,
        changes: Partial<Item>
    }) {}
}

export class DeleteItem implements Action {
    readonly type = DELETE_ITEM;

    constructor(public payload: string) {}
}


export type ItemActions = CreateItem | UpdateItem | DeleteItem;
