import * as authActions from "./auth-actions";

export interface State {
  pending: boolean;
  error: string | null;
  searchPending: boolean;
  searchUserError: string | null;
  isResetForm: boolean;
}

const initialState: State = {
  pending: false,
  error: null,
  searchPending: false,
  searchUserError: null,
  isResetForm: false
}

export function reducers(state: State = initialState, action: authActions.AUTH): State {
  switch (action.type) {
    case authActions.SIGNUP:
      return { ...state, pending: true, isResetForm: false, error: null };
    case authActions.SIGNUP_FAILURE:
      return { ...state, pending: false, isResetForm: false, error: action.payload };
    case authActions.SIGNUP_REDIRECT:
      return { ...state, pending: false, isResetForm: false, error: action.payload };
    case authActions.SIGNUP_USER:
      return { ...state, pending: false, isResetForm: false, searchPending: true, error: null, searchUserError: null };
    case authActions.SIGNUP_USER_INVALID:
      return { ...state, pending: false, searchPending: state.isResetForm ? false : state.isResetForm, error: null, searchUserError: state.isResetForm ? null : action.payload };
    case authActions.AUTH_FORM_RESET:
      return { ...state, isResetForm: true, searchPending: false, searchUserError: null, pending: false, error: null };

    default:
      return initialState;
  }
}

export const getSignupPending = (s: State) => s.pending;
export const getSignupError = (s: State) => s.error;
export const getSignupSearchUserPendingState = (s: State) => s.searchPending;
export const getSignupSearchUserError = (s: State) => s.searchUserError;
