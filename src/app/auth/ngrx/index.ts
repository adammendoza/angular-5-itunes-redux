import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from './../../root-redux/reducers';

import * as fromAuthReducers from "./auth-reducers";
import * as fromloginStatusReducers from "./login-status-reducers";
import * as fromSignupStatusReducers from "./signup-status-reducers";

export interface State extends fromRoot.State {
  authState: AuthState;
}

export interface AuthState {
  authReducers: fromAuthReducers.State;
  loginStatusReducers: fromloginStatusReducers.State;
  signupStatusReducers: fromSignupStatusReducers.State;
}
export const reducers = {
  authReducers: fromAuthReducers.reducers,
  loginStatusReducers: fromloginStatusReducers.reducers,
  signupStatusReducers: fromSignupStatusReducers.reducers
};

export const getAuth = createFeatureSelector<AuthState>('authState');
export const getAuthState = createSelector(getAuth, (s: AuthState) => s.authReducers);
export const getLoggedIn = createSelector(getAuthState, fromAuthReducers.getLoggedIn);
export const getCurrentUser = createSelector(getAuthState, fromAuthReducers.getCurrentUser);

export const getLoginState = createSelector(getAuth, (s: AuthState) => s.loginStatusReducers);
export const getLoginPendingState = createSelector(getLoginState, fromloginStatusReducers.getLoginPending);
export const getLoginErrorState = createSelector(getLoginState, fromloginStatusReducers.getLoginError);

export const getSignupState = createSelector(getAuth, (s: AuthState) => s.signupStatusReducers);
export const getSignupPendingState = createSelector(getSignupState, fromSignupStatusReducers.getSignupPending);
export const getSignupErrorState = createSelector(getSignupState, fromSignupStatusReducers.getSignupError);
export const getSignupSearchUserPendingState = createSelector(getSignupState, fromSignupStatusReducers.getSignupSearchUserPendingState);
export const getSignupSearchUserErrorState = createSelector(getSignupState, fromSignupStatusReducers.getSignupSearchUserError);


