import { CombinedState } from 'redux';

import { CombineReducer } from '../../types/interface/interface';

export const dateOrderSelector = (state: CombinedState<CombineReducer>) => state.booking.dateOrder;
export const bookingBookIdSelector = (state: CombinedState<CombineReducer>) => state.booking.book;
export const objectBookingSelector = (state: CombinedState<CombineReducer>) => state.booking;
export const currentBookIdSelector = (state: CombinedState<CombineReducer>) => state.booking.currentBook;
export const categoryBooksLengthSelector = (state: CombinedState<CombineReducer>) =>
  state.categoryBooks.category.length;

export const bookPageBookIdSelector = (state: CombinedState<CombineReducer>) => state.bookPage.book;
export const bookPageIdBookSelector = (state: CombinedState<CombineReducer>) => state.bookPage.book?.id;
export const bookPageCommentSelector = (state: CombinedState<CombineReducer>) => state.bookPage.book?.comments;

export const categoryBooksSelector = (state: CombinedState<CombineReducer>) => state.categoryBooks.category;

export const arrayListBookSelector = (state: CombinedState<CombineReducer>) => state.listBooks.list;
export const userIdSelector = (state: CombinedState<CombineReducer>) => state.response.user?.id;

export const authSelector = (state: CombinedState<CombineReducer>) => state.response.auth;
export const responseLoadedSelector = (state: CombinedState<CombineReducer>) => state.commonStateResponse.isLoaded;
export const responseErrorSelector = (state: CombinedState<CombineReducer>) => state.commonStateResponse.isError;
export const responseBookingErrorSelector = (state: CombinedState<CombineReducer>) =>
  state.commonStateResponse.isErrorBooking;
export const responseOpenWindowSelector = (state: CombinedState<CombineReducer>) => state.commonStateResponse.open;
export const responseTextWindowSelector = (state: CombinedState<CombineReducer>) => state.commonStateResponse.text;

export const getFirstNameSelector = (state: CombinedState<CombineReducer>) => state.response.user?.firstName;
export const getLastNameSelector = (state: CombinedState<CombineReducer>) => state.response.user?.lastName;
export const getAvatarSelector = (state: CombinedState<CombineReducer>) => state.response.user?.avatar;
export const getLoginSelector = (state: CombinedState<CombineReducer>) => state.response.user?.username;
export const getPhoneSelector = (state: CombinedState<CombineReducer>) => state.response.user?.phone;
export const getMailSelector = (state: CombinedState<CombineReducer>) => state.response.user?.email;

export const getBookingInfoSelector = (state: CombinedState<CombineReducer>) => state.response.user?.booking?.book;
export const getBookingDateSelector = (state: CombinedState<CombineReducer>) => state.response.user?.booking.dateOrder;
export const getBookingBookIdSelector = (state: CombinedState<CombineReducer>) => state.response.user?.booking.id;
export const getCommentUserSelector = (state: CombinedState<CombineReducer>) => state.comment;
export const getHistoruBooksSelector = (state: CombinedState<CombineReducer>) => state.response.user?.history.books;
export const getUserCommentSelector = (state: CombinedState<CombineReducer>) => state.response.user?.comments;
export const getDeliveryBookSelector = (state: CombinedState<CombineReducer>) => state.response.user?.delivery.book;
export const getDeliveryDateHandedTo = (state: CombinedState<CombineReducer>) => state.response.user?.delivery.dateHandedTo;

