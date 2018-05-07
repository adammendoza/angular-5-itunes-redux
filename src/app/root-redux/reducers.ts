import { 
  ActionReducerMap,
  createSelector
} from "@ngrx/store";
import * as auth from "./../auth/ngrx";
import * as app from "./app-reducers";


export interface State{
  appState: app.State;
}

export const reducers : ActionReducerMap<State> = {
  appState: app.reducers
}


