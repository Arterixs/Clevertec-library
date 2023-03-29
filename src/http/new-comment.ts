import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { actionBookingErrorResponse } from '../store/actions/action-creaters';
import { IRequestNewComment } from '../types/interface/interface';
import { PATH_COMMENTS } from '../utils/constants/path-url';
import { RECALL_ERROR, RECALL_SUCCES } from '../utils/constants/response-request';

import { $api } from './axios-create';
import { requestGetBookPage } from './get-book-page';

export const requestNewComment = async (data: IRequestNewComment, dispatch: Dispatch<AnyAction>) => {
  try {
    await $api.post(PATH_COMMENTS, { ...data });
    await requestGetBookPage(dispatch, data.data.book);
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: false, text: RECALL_SUCCES }));
  } catch (err) {
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: true, text: RECALL_ERROR }));
  }
};
