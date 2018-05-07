import * as authActions from "./auth-actions";

export interface State {
  pending: boolean;
  error: string | null;
}

const initialState: State = {
  pending: false,
  error: null
}

export function reducers(state: State = initialState, action: authActions.AUTH): State {
  switch (action.type) {
    case authActions.LOG_IN:
      return { ...state, pending: true, error: null };
    case authActions.LOGIN_FAILURE:
      return { ...state, pending: false, error: action.payload };
    case authActions.LOGIN_REDIRECT:
      return { ...state, pending: false, error: action.payload };
    default:
      return initialState;
  }
}

export const getLoginPending = (state: State) => state.pending;
export const getLoginError = (state: State) => state.error;
