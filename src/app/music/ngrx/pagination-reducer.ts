import * as fromPaginationActions from "./pagination-actions";
import * as _ from 'lodash';
export interface State {
  currentPage: number;
  displayedItems: any[];
  perPage: number;
}

export const initialState: State = {
  currentPage: 1,
  displayedItems: null,
  perPage: 20
}

export function getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
  let totalPages = Math.ceil(totalItems / pageSize);

  let startPage: number, endPage: number;
  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  let pages = _.range(startPage, endPage + 1);

  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };
}
export function reducer(state: State = initialState, action: fromPaginationActions.ACTIONS): State {

  switch (action.type) {
    case fromPaginationActions.NEXT_PAGE: {
      return { ...state, currentPage: state.currentPage + 1 };
    }

    case fromPaginationActions.PREVIOUS_PAGE: {
      return { ...state, currentPage: state.currentPage - 1 };
    }

    case fromPaginationActions.GO_TO_PAGE: {
      return { ...state, currentPage: action.payload.page };
    }

    case fromPaginationActions.DISPLAY_ITEMS: {
      return { ...state, displayedItems: action.payload.displayedItems };
    }

    case fromPaginationActions.PER_PAGE: {
      return { ...state, perPage: action.payload.perPage }
    }

    default: {
      return state;
    }
  }
}

export const getPerPage = (s: State) => s.perPage;
export const getCurrentPage = (s: State) => s.currentPage;