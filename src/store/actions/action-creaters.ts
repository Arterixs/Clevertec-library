import { ActionLoad } from '../../types/enum';
import { IObjectActionBookingError, IObjectActionError, IStateBooking, IStateComment } from '../../types/interface/interface';
import { IBodyAuthResponse, ICategoryBooks, IDataIdBook, IListBooks } from '../../types/interface/response';

export const actionListBook = (data: IListBooks) => ({ type: ActionLoad.GET_LIST_BOOKS, data });
export const actionCategoryBook = (data: ICategoryBooks) => ({ type: ActionLoad.GET_CATEGORY_BOOKS, data });
export const actionGetIdBook = (data: IDataIdBook) => ({ type: ActionLoad.GET_ID_BOOK, data });
export const actionAuth = (data: boolean) => ({ type: ActionLoad.AUTH, data });
export const actionBody = (data: IBodyAuthResponse) => ({ type: ActionLoad.BODY_AUTH, data });
export const actionDateOrder = (data: string) => ({ type: ActionLoad.SET_DATE_ORDER, data });
export const actionBookId = (data: number) => ({ type: ActionLoad.SET_BOOK, data });
export const actionLoadedResponse = (data: boolean) => ({ type: ActionLoad.LOADED, data });
export const actionErrorResponse = (data: IObjectActionError) => ({ type: ActionLoad.ERROR, data });
export const actionCloseOpen = (data: false) => ({ type: ActionLoad.CLOSE_WINDOW, data });
export const actionSetDataBooking = (data: IStateBooking) => ({ type: ActionLoad.SET_DATA_BOOKING, data });
export const actionBookingErrorResponse = (data: IObjectActionBookingError) => ({
  type: ActionLoad.ERROR_BOOKING,
  data,
});
export const actionSetComment = (data: IStateComment) => ({ type: ActionLoad.SET_COMMENT, data });
