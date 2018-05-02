import { EntityState, createEntityAdapter } from '@ngrx/entity';
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

export function itemReducer(state: ItemState = initialState, action: actions.All) {

    switch (action.type) {

        case actions.FETCH_DATA_SUCCESS:
            return itemAdapter.addAll(action.payload, state);

        case actions.SET_SHOP_DATA:
            if (state.ids.length < 1) {
                return itemAdapter.addAll(shuffle(action.payload), state);
            } else {
                return state;
            }

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

function shuffle(a: Array<any>): Array<any> {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const getItemState = createFeatureSelector<ItemState>('item');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = itemAdapter.getSelectors(getItemState);

export const getIsLoading = (state: State) => state.ui.isLoading;

function removeMyItems(a: Item[], uid: string): Item[] {
    const newArray: Item[] = [];
    a.forEach(i => {
        if (i.owner !== uid) {
            newArray.push(i);
        }
    });
    return newArray;
}

export const getUser = (state: State) => state.auth.loggedUser;
export const getNonMine = createSelector(selectAll, getUser, (all, user) => {
    if (user) {
        return removeMyItems(all, user.uid);
    }
});

export function metaReducer( reducer ) {
    const fallbackState = reducer(undefined, actions);
    return function (state, action) {
        if (action.type === actions.RESET_STATE) {
          return fallbackState;
        }
    const nextState = reducer(state, action);
    return nextState;
    };
}
