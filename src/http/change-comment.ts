import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { actionBookingErrorResponse } from '../store/actions/action-creaters';
import { IRequestNewComment } from '../types/interface/interface';
import { PATH_COMMENTS } from '../utils/constants/path-url';
import { CHANGE_COMMENT_ERROR, CHANGE_COMMENT_SUCCES } from '../utils/constants/response-request';

import { requestGetUser } from './get-user';
import { $api } from './axios-create';

export const requestChangeComment = async (
  data: IRequestNewComment,
  dispatch: Dispatch<AnyAction>,
  commentId: number
) => {
  try {
    await $api.put(`${PATH_COMMENTS}/${commentId}`, { ...data });
    await requestGetUser(dispatch);
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: false, text: CHANGE_COMMENT_SUCCES }));
  } catch (err) {
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: true, text: CHANGE_COMMENT_ERROR }));
  }
};
