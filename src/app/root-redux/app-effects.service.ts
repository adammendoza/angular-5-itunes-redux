

import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';


import {
  debounceTime,
  map,
  switchMap,
  skip,
  takeUntil,
  catchError,
  tap
} from 'rxjs/operators';
import * as appActions from './app-actions';
import { Router } from "@angular/router";


@Injectable()
export class AppEffectsService{

  @Effect({dispatch: false})
  redirectTo = this.action$.pipe(
    ofType(appActions.REDIRECT_TO),
    tap((action: appActions.RedirectToAction) =>{ 
      this.router.navigate([action.payload]);
      })
    );
  constructor( 
    private action$: Actions,
    private router: Router
    ){}
}