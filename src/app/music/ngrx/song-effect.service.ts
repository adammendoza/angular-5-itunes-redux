import * as fromSongActions from './song-actions';
import * as fromSongCollectionActions from './song-collection-actions';

import { MusicService } from './../services/music.service';
import { ISong } from '../../models/song';
import { USER_KEY } from './../../utils/auth';
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
  flatMap,
  skip,
  takeUntil,
  catchError,
  exhaustMap,
  tap,
  toArray
} from 'rxjs/operators';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

@Injectable()
export class SongEffectService{

  @Effect()
  search$: Observable<Action> = this.action$.pipe(
    ofType<fromSongActions.SongSearchAction>(fromSongActions.SONG_SEARCH),
    debounceTime(this.debouceTime || 300, this.scheduler || async),
    map(action => action.payload),
    switchMap(query => {
      if(query === '')
        return empty();

      const nextSearch$ = this.action$.pipe(
        ofType(fromSongActions.SONG_SEARCH),
        skip(1)
      );

      return this.songService.search(query).pipe(
        takeUntil(nextSearch$),
        map((songs: ISong[]) => {
          return new fromSongActions.SongSearchCompleteAction(songs);
          }),
        catchError(err => of(new fromSongActions.SongSearchErrorAction(err)))
      );
    })

  );
  @Effect()
  addSong$ = this.action$.pipe(
    ofType(fromSongCollectionActions.ADD_SONG),
    
    map((action: any) => action.payload.trackId),
    flatMap(trackId=>{
      return this.songService.addSongToCollection(trackId).pipe(map(val=>{
                return new fromSongCollectionActions.AddSongSuccessAction({trackId });
      }))
    })
  )
  @Effect()
  remove = this.action$.pipe(
    ofType(fromSongCollectionActions.REMOVE_SONG),
    map((action: any) => action.payload),
    flatMap(trackId =>
    {
        return this.songService.removeSongInCollection(trackId).pipe(
         map(val=>{
           return new fromSongCollectionActions.RemoveSongSuccessAction(val);
         }) 
        );
    })
  );

  @Effect()
  load = this.action$.pipe(
    ofType(fromSongCollectionActions.LOAD),
    map((action: any) => action.payload.map(song=> song.trackId)),
    flatMap(result=>{
      return this.songService.lookupSong(result.join(',')).pipe(
        map(val=>{
        return new fromSongCollectionActions.LoadSuccessAction(val);  
      }))
    })
  );
  constructor(private songService: MusicService, 
    private action$: Actions, 

    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debouceTime: number,
    //for testing purpouse
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
    ){}
}