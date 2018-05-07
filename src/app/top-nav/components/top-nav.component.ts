import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import * as Auth from './../../auth/ngrx/auth-actions';
import * as fromAuth from './../../auth/ngrx';
import { IUser } from "./../../models/user";

@Component({
  selector: 'top-nav',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['styles.css']
})
export class TopNavComponent implements OnInit {
  currentUser: Observable<string>;
  authored: Observable<boolean>;
  currentAuthState: Observable<{loggedIn: boolean, currentUser: IUser}>;

  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.currentAuthState = this.store.pipe(
      select(fromAuth.getAuthState),
      )
    this.currentUser = this.store.pipe(
      select(fromAuth.getCurrentUser),
      map((user: IUser) => {
        return user ? user.username : null; 
      })
    );

    this.authored = this.store.pipe(
      select(fromAuth.getLoggedIn),
      map((authored: boolean) => {
        return !authored; 
      })
    );
  }

  logout() {
    this.store.dispatch(new Auth.LogoutAction(''));
  }
} 