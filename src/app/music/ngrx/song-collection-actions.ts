import { Action } from "@ngrx/store";
import { ISong } from './../../models/song';

export const ADD_SONG = "[COLLECTION] Add song";
export const ADD_SONG_SUCCESS = "[COLLECTION] Add song success";
export const ADD_SONG_FAIL = "[COLLECTION] Add song fail";
export const ADD_SONG_TO_USER_COLLECTION = "[USER_COLLECTION] Add song to user collection";
export const ADD_SONG_SUCCESS_TO_USER_COLLECTION = "[USER_COLLECTION] Add song success to user collection";
export const ADD_SONG_FAIL_TO_USER_COLLECTION = "[USER_COLLECTION] Add song fail to user collection";
export const REMOVE_SONG = "[COLLECTION] Remove song";
export const REMOVE_SONG_SUCCESS = "[COLLECTION] Remove song success";
export const REMOVE_SONG_FAIL = "[COLLECTION] Remove song fail";
export const LOAD = "[COLLECTION] Load";
export const LOAD_SUCCESS = "[COLLECTION] Load success";
export const LOAD_FAIL = "[COLLECTION] Load fail";

export class AddSongAction implements Action{
  readonly type = ADD_SONG;
  constructor(public payload: any){
  }
}
export class AddSongSuccessAction implements Action{
  readonly type = ADD_SONG_SUCCESS;
  constructor(public payload: any){
  }
}
export class AddSongFailAction implements Action{
  readonly type = ADD_SONG_FAIL;
  constructor(public payload: ISong){
  }
}

export class AddSongToUserCollectionAction implements Action{
  readonly type = ADD_SONG_TO_USER_COLLECTION;
  constructor(public payload: ISong){
  }
}
export class AddSongSuccessToUserCollectionAction implements Action{
  readonly type = ADD_SONG_SUCCESS_TO_USER_COLLECTION;
  constructor(public payload: ISong){
  }
}
export class AddSongFailToUserCollectionAction implements Action{
  readonly type = ADD_SONG_FAIL_TO_USER_COLLECTION;
  constructor(public payload: ISong){
  }
}

export class RemoveSongAction implements Action{
  readonly type = REMOVE_SONG;
  constructor(public payload: any){
  }
}
export class RemoveSongSuccessAction implements Action{
  readonly type = REMOVE_SONG_SUCCESS;
  constructor(public payload: ISong){
  }
}
export class RemoveSongFailAction implements Action{
  readonly type = REMOVE_SONG_FAIL;
  constructor(public payload: ISong){
  }
}
export class LoadAction implements Action{
  readonly type = LOAD;
  public constructor(public payload: {trackId: number}[]){

  }
}
export class LoadSuccessAction implements Action{
  readonly type = LOAD_SUCCESS;
  constructor(public payload: any){
  }
}
export class LoadFailAction implements Action{
  readonly type = LOAD_FAIL;
  constructor(public payload: any){
  }
}

export type SONG_COLLECTION = LoadAction | LoadFailAction | LoadSuccessAction | 
AddSongAction | AddSongFailAction | AddSongSuccessAction |
RemoveSongAction | RemoveSongFailAction | RemoveSongSuccessAction;