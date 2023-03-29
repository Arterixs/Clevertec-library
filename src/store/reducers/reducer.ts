import { ActionLoad } from '../../types/enum';
import { IINititalState } from '../../types/interface/interface';
import { ActionsType } from '../../types/types';
import { initialState } from '../state/initial-state';

export const reducerListBook = (state: IINititalState = initialState, action: ActionsType): IINititalState => {
  switch (action.type) {
    case ActionLoad.GET_LIST_BOOKS:
      return { ...state, list: [...action.data] };
    default:
      return state;
  }
};
