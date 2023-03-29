import { ActionLoad } from '../enum';
import { IObjectActionBookingError, IObjectActionError, IStateBooking, IStateComment } from './interface';

import { IBodyAuthResponse, ICategoryBooks, IDataIdBook, IListBooks } from './response';

export interface IActionDateOrder {
  type: ActionLoad.SET_DATE_ORDER;
  data: string;
}

export interface IActionDataBooking {
  type: ActionLoad.SET_DATA_BOOKING;
  data: IStateBooking;
}

export interface IActionBook {
  type: ActionLoad.SET_BOOK;
  data: number;
}

export interface IActionList {
  type: ActionLoad.GET_LIST_BOOKS;
  data: IListBooks[] | [];
}

export interface IErrorBooking {
  type: ActionLoad.ERROR_BOOKING;
  data: IObjectActionBookingError;
}

export interface IActionNavigation {
  type: ActionLoad.SET_PATH;
  data: string;
}

export interface IActionCategory {
  type: ActionLoad.GET_CATEGORY_BOOKS;
  data: ICategoryBooks[] | [];
}

export interface IActionComment {
  type: ActionLoad.SET_COMMENT;
  data: IStateComment;
}

export interface IActionIdBooks {
  type: ActionLoad.GET_ID_BOOK;
  data: IDataIdBook;
}

export interface ILoaded {
  type: ActionLoad.LOADED;
  data: boolean;
}

export interface ICloseWindow {
  type: ActionLoad.CLOSE_WINDOW;
  data: boolean;
}

export interface IError {
  type: ActionLoad.ERROR;
  data: IObjectActionError;
}

export interface IResponseAuth {
  type: ActionLoad.AUTH;
  data: boolean;
}

export interface IResponseBodyAuth {
  type: ActionLoad.BODY_AUTH;
  data: IBodyAuthResponse | null;
}
