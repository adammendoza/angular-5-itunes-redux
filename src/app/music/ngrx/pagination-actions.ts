import { Action } from "@ngrx/store";

export const NEXT_PAGE = "[NEXT] go to next page";
export const PREVIOUS_PAGE = "[PREVIOUS] go to previous page";
export const GO_TO_PAGE = "[GO_TO_PAGE] Go to page"
export const DISPLAY_ITEMS = "[DISPLAY_ITEMS] Set displayed items"
export const PER_PAGE = "[PER_PAGE] PER_PAGE displayed items";

export class NextPageAction implements Action{
  readonly type = NEXT_PAGE;
}

export class GoToPageAction implements Action{
  readonly type = GO_TO_PAGE;
  constructor(public payload: {page: number}){
  } 
}

export class PreviousPageAction implements Action{
  readonly type = PREVIOUS_PAGE;
}

export class DisplayItemsAction implements Action{
  readonly type = DISPLAY_ITEMS;
  constructor(public payload: {displayedItems: any[]}){
  }
}

export class PerPageAction implements Action{
  readonly type = PER_PAGE;
  constructor(public payload: { perPage: number }){
  }
}



export type ACTIONS = NextPageAction | GoToPageAction | PreviousPageAction | DisplayItemsAction | PerPageAction;