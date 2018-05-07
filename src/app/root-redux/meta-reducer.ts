import { ActionReducerMap, Action } from '@ngrx/store';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import * as authActions from "./../auth/ngrx/auth-actions";
import { State } from './reducers';

export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: Action): State {
    if (action.type === authActions.LOG_OUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<State>[] = [clearState];