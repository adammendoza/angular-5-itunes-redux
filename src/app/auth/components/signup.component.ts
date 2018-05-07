import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ISignupUser } from '../../models/user';
import { AuthService } from "./../services/auth.service";
import { Store, select } from "@ngrx/store";
import * as reducers from './../ngrx';
import * as authActions from "./../ngrx/auth-actions";
import * as rootReducers from './../../root-redux/reducers';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})
export class SignupComponent {
  pending$ = this.store.select(reducers.getSignupPendingState);
  error$ = this.store.select(reducers.getSignupErrorState);

  searchUser$ = this.store.select(reducers.getSignupSearchUserErrorState);
  pendingSearchUser$ = this.store.select(reducers.getSignupSearchUserPendingState);
  signupUserAction: any = authActions.SIGNUP_USER;
  selectUserAvailableErrors: any = reducers.getSignupSearchUserErrorState;

  constructor(private authService: AuthService, private store: Store<rootReducers.State>) {

  }

  resetForm() {
    this.store.dispatch(new authActions.AuthFormResetAction());
  }
  
  submit(user: ISignupUser) {
    this.store.dispatch(new authActions.SignupAction(user));
  }
} 