import * as songCollectionActions from "./song-collection-actions";

export interface State{
  pending: boolean;
  trackId: number;
}


export const initialState: State = {pending: false, trackId: null};

export function reducer(state: State = initialState, action: songCollectionActions.SONG_COLLECTION) : State{
  switch(action.type){
    case songCollectionActions.ADD_SONG:{
      return {...state, pending: true, trackId: action.payload.trackId};
    }

  case songCollectionActions.ADD_SONG_SUCCESS:{
      return {...state, pending: false, trackId: action.payload.trackId};
    }

      default:
      return state;
  }
}


export const getPendingStatus = (s: State) => s.pending;
export const getPendingTrackId = (s: State) => s.trackId;