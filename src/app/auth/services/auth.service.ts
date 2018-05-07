import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Http, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IUser, ISignupUser } from './../../models/user';
import { of } from 'rxjs/observable/of';
import * as Auth from '../ngrx/auth-actions';
import * as fromAuth from '../ngrx';
import { USER_KEY } from './../../utils/auth';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {

  public get username() {
    let user = JSON.parse(localStorage.getItem(USER_KEY));
    if (user && user.username && new Date(user.token) > new Date()) {
      return user.username;
    }
    return null;
  }

  constructor(
    private http: Http,
    private store: Store<fromAuth.State>
  ) {
    let user = JSON.parse(localStorage.getItem(USER_KEY));
    console.log("USER ", user);

    if (user && user.username && new Date(user.token) > new Date()) {
      this.store.dispatch(new Auth.LogInSuccessAction(user));
    }
  }

  logIn({ username, password }: IUser): Observable<IUser> {
    return this.http.post('/api/authenticate/login', { username, password }).pipe(map(res => res.json()));

  }

  signup({ email, username, password }: ISignupUser): Observable<ISignupUser> {
    return this.http.post('/api/authenticate/signup', { username, password, email }).pipe(map(res => res.json()));
  }

  signupUser(username: string): Observable<{ error: boolean, errorMessage: string }> {
    return this.http.post('/api/authenticate/signup/user', { username }).pipe(map(res => res.json()));
  }
}