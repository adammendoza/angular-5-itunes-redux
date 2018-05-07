import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { AuthService } from "./../services/auth.service";
import * as authActions from './auth-actions';
import { tap, map, exhaustMap, catchError, takeWhile, switchMap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { USER_KEY } from './../../utils/auth';
import { IUser, ISignupUser } from './../../models/user';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffectsService {
  @Effect()
  login = this.action$.pipe(
    ofType(authActions.LOG_IN),
    map((action: authActions.LoginAction) => action.payload),
    exhaustMap((user: IUser) =>
      this.authService.logIn(user).pipe(
        map((user: any) => {
          if (user['error'])
            return new authActions.LogInFailureAction(user.errorMessages);
          return new authActions.LogInSuccessAction(user)
        }),
        takeWhile((action: authActions.LogInSuccessAction) => {
          return !action.payload.error;
        }),
        tap((action: authActions.LogInSuccessAction) => {
          localStorage.setItem(USER_KEY, JSON.stringify({
            username: action.payload.username,
            token: action.payload.token,
            songCollection: action.payload.songCollection
          }))
        }),
        catchError(error => of(new authActions.LogInFailureAction(error)))
      )
    ),
  );

  @Effect({ dispatch: false })
  loginSuccess = this.action$.pipe(
    ofType(authActions.LOGIN_SUCCESS),
    tap(() => this.router.navigate(['/music']))
  );

  @Effect()
  signup_user = this.action$.pipe(
    ofType(authActions.SIGNUP_USER),
    map((action: authActions.SignupUserAction) => action.payload),
    switchMap((state: any) =>
      this.authService.signupUser(state).pipe(
        map((user: any) => {
          if (user['error'])
            return new authActions.SignupUserInvalidAction(user.errorMessages);
          return new authActions.SignupUserValidAction(user)
        }),
        takeWhile((action: authActions.SignupUserValidAction) => {
          return !action.payload.error;
        }),
        catchError(error => {
          return of(new authActions.SignupUserInvalidAction(error))
        })
      )
    )
  );


  @Effect()
  signup = this.action$.pipe(
    ofType(authActions.SIGNUP),
    map((action: authActions.SignupAction) => action.payload),
    exhaustMap((state: ISignupUser) =>
      this.authService.signup(state).pipe(
        map((user: any) => {
          if (user['error'])
            return new authActions.SignupFailuresAction(user.errorMessages);
          return new authActions.SignupSuccessAction(user)
        }),
        takeWhile((action: authActions.SignupSuccessAction) => {
          return !action.payload.error;
        }),
        tap((action: authActions.SignupSuccessAction) => {
          localStorage.setItem(USER_KEY, JSON.stringify({
            username: action.payload.username,
            token: action.payload.token
          }));
        }),
        catchError(error => {
          return of(new authActions.SignupFailuresAction(error))
        })
      )
    )
  );

  @Effect({ dispatch: false })
  signupSuccess = this.action$.pipe(
    ofType(authActions.SIGNUP_SUCCESS),
    tap(() => this.router.navigate(['/music']))
  );

  @Effect({ dispatch: false })
  loginRedirect = this.action$.pipe(
    ofType(authActions.LOGIN_REDIRECT),
    tap((res: authActions.LogInRedirecteAction) => {
      this.router.navigate(['/']);
    })
  );


  @Effect({ dispatch: false })
  logout = this.action$.pipe(
    ofType(authActions.LOG_OUT),
    tap(() => {
      localStorage.removeItem(USER_KEY);
    }),
    tap(() => {
      this.router.navigate(['/signin'])
    })
  );

  constructor(private authService: AuthService, private action$: Actions, private router: Router) {

  }
}
