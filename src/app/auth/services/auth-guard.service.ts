
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import * as Auth from '../ngrx/auth-actions';
import * as fromAuth from '../ngrx';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromAuth.State>) {
  }

  canLoad(): Observable<boolean>{
        return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.LogInRedirecteAction( "You must login first!"));
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.LogInRedirecteAction("You must login first!"));
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}