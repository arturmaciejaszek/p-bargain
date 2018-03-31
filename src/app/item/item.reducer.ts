import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import * as actions from './item.actions';
import { Item } from './item.model';

// Entity adapter
export const itemAdapter = createEntityAdapter<Item>({
    selectId: (item: Item) => item.uid
});
export interface State extends EntityState<Item> { }

// Default data / initial state

const defaultState = {
    ids: [],
    entities: {}
};

export const initialState: State = itemAdapter.getInitialState(defaultState);

export function itemReducer(
    state: State = initialState,
    action: actions.All) {

    switch (action.type) {

        case actions.FETCH_DATA_SUCCESS:
            return itemAdapter.addAll(action.payload, state);

        case actions.CALL_SUCCESS:
            return state;

        case actions.CALL_FAILURE:
            return state;

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
