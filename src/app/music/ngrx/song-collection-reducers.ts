import * as songCollectionActions from './song-collection-actions';
import * as songActions from './song-actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export function reducer(
  state = initialState,
  action: any
): State {
  switch (action.type) {
    case songCollectionActions.LOAD: {
      return {
        ...state,
        loading: true,
      };
    }

    case songCollectionActions.LOAD_SUCCESS: {
      console.log("LOAD SUCCESS ", action.payload);
      return {
        loaded: true,
        loading: false,
        ids: action.payload.map(song => song.trackId),
      };
    }

    case songCollectionActions.ADD_SONG_SUCCESS:
    case songCollectionActions.REMOVE_SONG_FAIL: {
      if (state.ids.indexOf(action.payload.trackId) > -1) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, action.payload.trackId],
      };
    }

    case songCollectionActions.REMOVE_SONG_SUCCESS:
    case songCollectionActions.ADD_SONG_FAIL: {
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.trackId),
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getIds = (state: State) => state.ids;
