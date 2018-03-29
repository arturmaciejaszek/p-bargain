import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import { Item } from './item.model';
import { ItemActions, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from './item.actions';

export const itemAdapter = createEntityAdapter<Item>();
export interface State extends EntityState<Item> { }


// Default data / initial state
const defaultCollection = {
    ids: ['123'],
    entities: {
        '123': {
            uid: '123',
        }
    }
};

export const initialState: State = itemAdapter.getInitialState(defaultCollection);

export function itemReducer(state: State = initialState, action: ItemActions) {

    switch (action.type) {
        case CREATE_ITEM:
            return itemAdapter.addOne(action.payload, state);

        case UPDATE_ITEM:
            return itemAdapter.updateOne({
                id: action.payload.uid,
                changes: action.payload.changes,
            }, state);

        case DELETE_ITEM:
            return itemAdapter.removeOne(action.payload, state);

        default:
            return state;
        }

}

export const getItemState = createFeatureSelector<State>('item');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = itemAdapter.getSelectors(getItemState);
