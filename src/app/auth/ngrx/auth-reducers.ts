import * as authActions from './auth-actions';
import { IUser } from "./../../models/user"


export interface State {
  loggedIn: boolean;
  currentUser: IUser | null;
}

const initialState: State = { loggedIn: false, currentUser: null };

export function reducers(state: State = initialState, action: authActions.AUTH): State {
  switch (action.type) {
    case authActions.LOGIN_SUCCESS:
      return { ...state, loggedIn: true, currentUser: action.payload };
    case authActions.SIGNUP_SUCCESS:
      return { ...state, loggedIn: true, currentUser: action.payload };
    case authActions.LOG_OUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}


export const getLoggedIn = (state: State) => state.loggedIn;
export const getCurrentUser = (state: State) => state.currentUser;
