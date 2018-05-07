import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromSearch from "./search-reducers";
import * as fromSong from "./song-reducers";
import * as fromSongCollection from "./song-collection-reducers";
import * as fromRoot from './../../root-redux/reducers';
import * as fromSongStatus from "./song-status-reducer";
import * as fromPagination from "./pagination-reducer";

export interface MusicState {
  search: fromSearch.State,
  songs: fromSong.State
  songCollection: fromSongCollection.State,
  songStatus: fromSongStatus.State,
  pagination: fromPagination.State
}

export interface State extends fromRoot.State {
  musicState: MusicState;
}

export const reducers = {
  search: fromSearch.reducer,
  songs: fromSong.reducer,
  songCollection: fromSongCollection.reducer,
  songStatus: fromSongStatus.reducer,
  pagination: fromPagination.reducer,
}

export const getSongState = createFeatureSelector<MusicState>('musicState');
export const getSongEntitiesState = createSelector(
  getSongState,
  s => s.songs
);

export const getSelectedSongId = createSelector(
  getSongEntitiesState,
  fromSong.getSelectedId
);

export const {
  selectIds: getSongIds,
  selectEntities: getSongEntities,
  selectAll: getAllSongs,
  selectTotal: getTotalSongs
} = fromSong.adapter.getSelectors(getSongEntitiesState);

export const getSelectedSong = createSelector(getSongEntities, getSelectedSongId, (entities, songId) => {
  return songId && entities[songId];
});

export const getSearchState = createSelector(getSongState,
  (s: MusicState) => s.search);

export const getSearchSongIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchSongQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchSongLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchSongError = createSelector(
  getSearchState,
  fromSearch.getError
);

export const getSearchResults = createSelector(getSongEntities,
  getSearchSongIds,
  (songEntities, ids) => ids.map(id => songEntities[id]));

export const getCollectionState = createSelector(getSongState,
  (s: MusicState) => s.songCollection);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromSongCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromSongCollection.getLoading
);
export const getCollectionIds = createSelector(
  getCollectionState,
  fromSongCollection.getIds
);
export const getSongCollection = createSelector(
  getSongEntities,
  getCollectionIds,
  (entities, ids) => {
    return ids.map((id: any) => {
      if (entities) {
        return entities[id];
      }
      return false;
    });
  });

export const isSelectedSongInCollection = createSelector(getCollectionIds,
  getSelectedSongId,
  (ids, selectedId) => ids.indexOf(selectedId)
);

export const getSongStatusState = createSelector(getSongState,
  (s: MusicState) => s.songStatus);

export const getSongStatusPending = createSelector(getSongStatusState, fromSongStatus.getPendingStatus);
export const getSongStatusTrackId = createSelector(getSongStatusState, fromSongStatus.getPendingTrackId);

export const getPaginationState = createSelector(
  getSongState,
  s => s.pagination
);
export const getCurrentPage = createSelector(getPaginationState,
  fromPagination.getCurrentPage
)

export const getPerPage = createSelector(getPaginationState,
  fromPagination.getPerPage
)

export const getDisplayedItems = createSelector(getSearchResults,
  getCurrentPage,
  getPerPage,
  (ids, currentPage, perPage) => {
    let pager = fromPagination.getPager(ids.length, currentPage, perPage);
    return ids.slice(pager.startIndex, pager.endIndex + 1);
  }
);
