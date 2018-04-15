import { EntityState, createEntityAdapter, Update } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as actions from './item.actions';
import { Item } from './item.model';

export const itemAdapter = createEntityAdapter<Item>({
    selectId: (item: Item) => item.uid
});
export interface ItemState extends EntityState<Item> { }

export interface State extends fromRoot.State {
    item: ItemState;
}

const defaultState: ItemState = {
    ids: [],
     entities: {}
};

export const initialState: ItemState = itemAdapter.getInitialState(null);

export function itemReducer(
    state: ItemState = initialState,
    action: actions.All) {

    switch (action.type) {

        case actions.FETCH_DATA_SUCCESS:
        // It's good for shop but bad for profile and bargains gotta think of something else,
        // additional payload mby or route reading or mby just add a second stream or even second store

            // let mappedPayload: Update<Item>[];
            // mappedPayload = action.payload.map( item => {
            //     let updItem: Update<Item>;
            //     return updItem = {
            //         id: item.uid,
            //         changes: item
            //     };
            // });

            // if (state.ids.length < 1) {
            //     return itemAdapter.upsertMany(mappedPayload, state);
            // } else {
            //     // return itemAdapter.addAll(action.payload, state);
            //     return
            // }

            // return itemAdapter.upsertMany(mappedPayload, state);
            return itemAdapter.addAll(action.payload, state);

        case actions.IGNORE_ITEM:
            return itemAdapter.removeOne(action.payload.uid, state);

        case actions.CALL_SUCCESS:
            return state;

        case actions.CALL_FAILURE:
            return state;

        default:
            return state;
        }

}

export const getItemState = createFeatureSelector<ItemState>('item');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = itemAdapter.getSelectors(getItemState);

export const getIsLoading = (state: State) => state.ui.isLoading;

