import { Action } from "@ngrx/store";

import { ISignupUser } from "./../../models/user";

export const LOG_IN = "[LOG_IN] user log in ";
export const LOG_OUT = "[LOG_OUT] user log out ";
export const LOGIN_SUCCESS = "[LOGIN_SUCCESS] login success";
export const LOGIN_FAILURE = "[LOGIN_FAILURE] fail to login";
export const LOGIN_REDIRECT = "[LOGIN_REDIRECT] login redirect";

export const SIGNUP = "[SIGNUP] user signup";
export const SIGNUP_SUCCESS = "[SIGNUP_SUCCESS] user signup success";
export const SIGNUP_FAILURE = "[SIGNUP_FAILURE] user signup failure";
export const SIGNUP_REDIRECT = "[SIGNUP_REDIRECT] user signup redirect";

export const SIGNUP_USER = "[SIGNUP_USER] verify user allready";
export const SIGNUP_USER_INVALID = "[SIGNUP_USER_INVALID] user allready taken";
export const SIGNUP_USER_VALID = "[SIGNUP_VERIFY_USER] user valid";

export const AUTH_FORM_RESET = "[AUTH_FORM_RESET] form reset";

export class AuthFormResetAction implements Action {
  readonly type = AUTH_FORM_RESET;
}

export class SignupUserInvalidAction implements Action {
  readonly type = SIGNUP_USER_INVALID;
  constructor(public payload: any) {
  }
}
export class SignupUserAction implements Action {
  readonly type = SIGNUP_USER;
  constructor(public payload: any) {
  }
}
export class SignupUserValidAction implements Action {
  readonly type = SIGNUP_USER_VALID;
  constructor(public payload: any) {
  }
}

export class SignupAction implements Action {
  readonly type = SIGNUP;
  constructor(public payload: any) {
  }
}

export class SignupSuccessAction implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(public payload: any) {
  }
}

export class SignupFailuresAction implements Action {
  readonly type = SIGNUP_FAILURE;
  constructor(public payload: any) {
  }
}

export class SignupRedirecteAction implements Action {
  readonly type = SIGNUP_REDIRECT;
  constructor(public payload: any) {
  }
}

export class LoginAction implements Action {
  readonly type = LOG_IN;
  constructor(public payload: any) {
  }
}

export class LogoutAction implements Action {
  readonly type = LOG_OUT;
  constructor(public payload: any) {
  }
}

export class LogInSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LogInFailureAction implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload: any) {
  }
}

export class LogInRedirecteAction implements Action {
  readonly type = LOGIN_REDIRECT;
  constructor(public payload: any) {
  }
}

export type AUTH = LoginAction | LogoutAction | LogInSuccessAction | LogInFailureAction | LogInRedirecteAction
  | SignupAction | SignupFailuresAction | SignupSuccessAction | SignupRedirecteAction | SignupUserAction |
  SignupUserInvalidAction | SignupUserValidAction | AuthFormResetAction;
