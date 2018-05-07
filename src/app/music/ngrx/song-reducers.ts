import { ActionReducerMap, createSelector } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as songActions from './song-actions';
import * as songCollectionActions from './song-collection-actions';
import * as root from './../../auth/ngrx';
import { ISong } from './../../models/song';


export interface State extends EntityState<ISong> {
  selectSongId: number | null;
}

export const adapter: EntityAdapter<ISong> = createEntityAdapter<ISong>({
  selectId: (song: ISong) => song.trackId,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectSongId: null
});


export function reducer(state: State = initialState, action: any): State {
  switch (action.type) {
    case songActions.SONG_SEARCH_COMPLETE:
    case songCollectionActions.LOAD_SUCCESS:
      return {
        ...adapter.addMany(action.payload, state),
        selectSongId: state.selectSongId,
      };
    case songActions.SONG_LOAD:
      return {
        ...adapter.addOne(action.payload, state),
        selectSongId: state.selectSongId
      };
    case songActions.SONG_SELECT:
      return {
        ...state,
        selectSongId: action.payload
      };
    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectSongId;