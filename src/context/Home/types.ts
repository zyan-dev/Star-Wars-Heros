import { User } from '../../types/Home';

export const SET_RESULT = 'Set fetched user';
export const SEARCHING_RESULT = 'Searching people';
export const SET_PAGE = 'Set page number';
export const SET_MAX_PAGE = 'Set max page number';

export type SetResultAction = {
  type: typeof SET_RESULT;
  payload: User[];
};

export type SearchResultAction = {
  type: typeof SEARCHING_RESULT;
  payload: boolean;
};

export type SetPageAction = {
  type: typeof SET_PAGE;
  payload: number;
}
  ;
export type SetMaxPageAction = {
  type: typeof SET_MAX_PAGE;
  payload: number;
};

export type HomeAction = (
  SetResultAction |
  SearchResultAction |
  SetPageAction |
  SetMaxPageAction
);
