import { Action } from "@ngrx/store";
import { ISong } from './../../models/song';

export const SONG_SEARCH = '[SONG_SEARCH] Song search';
export const SONG_SEARCH_COMPLETE = '[SONG_SEARCH_COMPLETE] Song search complete';
export const SONG_SEARCH_ERROR = '[SONG_SEARCH_ERROR] Song search error';
export const SONG_LOAD = "[SONG_LOAD] song load";
export const SONG_SELECT = "[SONG_SELECT]";

export class SongSearchAction implements Action{
  readonly type = SONG_SEARCH;
  constructor(public payload: string){
  }
}
export class SongSearchCompleteAction implements Action{
  readonly type = SONG_SEARCH_COMPLETE;
  constructor(public payload: ISong[]){
  }
}
export class SongSearchErrorAction implements Action{
  readonly type = SONG_SEARCH_ERROR;
  constructor(public payload: string){
  }
}
export class SongLoadAction implements Action{
  readonly type = SONG_LOAD;
  constructor(public payload: ISong){
  }
}
export class SongSelectAction implements Action{
  readonly type = SONG_SELECT;
  constructor(public payload: ISong){
  }
}





export type SONG_ACTIONS =
 SongLoadAction | SongSearchAction |
 SongSearchCompleteAction | SongSearchErrorAction | 
 SongSelectAction;