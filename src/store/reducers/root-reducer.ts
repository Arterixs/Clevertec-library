import { combineReducers } from 'redux';

import { reducerListBook } from './reducer';
import { reducerBooking } from './reducer-booking';
import { reducerCategory } from './reducer-category';
import { reducerComment } from './reducer-comment';
import { reducerGetIdBook } from './reducer-id-book';
import { reducerResponseOfRequest } from './reducer-resp-req';
import { reducerResponse } from './reducer-response';

export const rootReducer = combineReducers({
  listBooks: reducerListBook,
  categoryBooks: reducerCategory,
  bookPage: reducerGetIdBook,
  response: reducerResponse,
  booking: reducerBooking,
  commonStateResponse: reducerResponseOfRequest,
  comment: reducerComment,
});
