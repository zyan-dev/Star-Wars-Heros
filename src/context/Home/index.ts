import { User } from '../../types/Home';
import createDataContext from '../createDataContext';
import {
  HomeAction,
  SET_RESULT,
  SEARCHING_RESULT,
  SET_PAGE,
  SET_MAX_PAGE,
} from './types';

export interface HomeState {
  page: number;
  peoples: User[] | string;
  searching: boolean;
  maxPage: number;
}

const initialState: HomeState = {
  page: 1,
  peoples: '',
  searching: false,
  maxPage: 1,
};

const homeReducer = (state: HomeState, action: HomeAction) => {
  switch (action.type) {
    case SET_RESULT:
      return {
        ...state,
        peoples: action.payload,
      };
    case SEARCHING_RESULT:
      return {
        ...state,
        searching: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_MAX_PAGE:
      return {
        ...state,
        maxPage: action.payload,
      };
    default:
      return state;
  }
};

export const dispatchAction = (dispatch: any) => async (action: HomeAction) => {
  dispatch(action);
};

export const searchPeople = (dispatch: any) => (name: string, page: number) => {
  dispatch({ type: SEARCHING_RESULT, payload: true });
  fetch(`https://swapi.dev/api/people?search=${name}&page=${page}`, {
    method: 'GET',
    headers: {
      // 'Authentication': 'Bearer ac6ce528245439fda03b3539c60427d2',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.results && res.results.length > 0) {
        dispatch({ type: SET_RESULT, payload: res.results });
        const mp = Math.floor(res.count / 10) + 1;
        dispatch({ type: SET_MAX_PAGE, payload: mp });
        if (mp < page) dispatch({ type: SET_PAGE, payload: 1 });
      } else {
        dispatch({ type: SET_RESULT, payload: 'Not found' });
      }
    })
    .catch((e) => {
      console.error(e.toString());
      dispatch({ type: SET_RESULT, payload: 'Error occured' });
    })
    .finally(() => {
      dispatch({ type: SEARCHING_RESULT, payload: false });
    });
};

export const { Provider, Context } = createDataContext(
  homeReducer,
  {
    dispatchAction,
    searchPeople,
  },
  initialState,
);
