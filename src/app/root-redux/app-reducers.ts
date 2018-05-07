import * as appActions from './app-actions';

export interface State{
  appAction: string;
}
const initialState: State = {appAction: ""};

export function reducers(state: State = initialState, action: appActions.APP_ACTIONS): State {
  switch(action.type){
    case appActions.REDIRECT_TO:
      return {...state, appAction: action.payload};
    default:

      return state;
  }
}