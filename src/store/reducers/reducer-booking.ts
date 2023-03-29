import { ActionLoad } from '../../types/enum';
import { IStateBooking } from '../../types/interface/interface';
import { ActionBooking } from '../../types/types';
import { stateBooking } from '../state/state-booking';

export const reducerBooking = (state: IStateBooking = stateBooking, action: ActionBooking): IStateBooking => {
  switch (action.type) {
    case ActionLoad.SET_DATA_BOOKING:
      return {
        ...state,
        order: action.data.order,
        dateOrder: action.data.dateOrder,
        book: action.data.book,
        currentBook: action.data.currentBook,
      };
    case ActionLoad.SET_DATE_ORDER:
      return { ...state, dateOrder: action.data };
    case ActionLoad.SET_BOOK:
      return { ...state, book: action.data, order: true };
    default:
      return state;
  }
};
