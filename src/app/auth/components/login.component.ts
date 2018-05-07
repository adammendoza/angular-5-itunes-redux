import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUser } from '../../models/user';
import { AuthService } from "./../services/auth.service";
import { Store, select } from "@ngrx/store";
import * as reducers from './../ngrx';
import * as rootReducers from './../../root-redux/reducers';
import * as rootActions from './../../root-redux/app-actions';

import * as authActions from "./../ngrx/auth-actions";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  pending$ = this.store.select(reducers.getLoginPendingState);
  error$ = this.store.select(reducers.getLoginErrorState);

  constructor(private authService: AuthService, private store: Store<rootReducers.State>) {
  }

  ngOnInit() {
    this.store.pipe(select(reducers.getLoggedIn)).subscribe(val => {
      if (val) {
        this.store.dispatch(new rootActions.RedirectToAction('music'));
      }
    });
  }
  
  submit(user: IUser) {
    this.store.dispatch(new authActions.LoginAction(user));
  }
} 