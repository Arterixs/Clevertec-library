import { ActionLoad } from '../../types/enum';
import { IStateBookPage } from '../../types/interface/interface';
import { ActionsGetIdBook } from '../../types/types';
import { stateBookPage } from '../state/state-book-page';

export const reducerGetIdBook = (state: IStateBookPage = stateBookPage, action: ActionsGetIdBook): IStateBookPage => {
  switch (action.type) {
    case ActionLoad.GET_ID_BOOK:
      return { ...state, book: action.data };
    default:
      return state;
  }
};
