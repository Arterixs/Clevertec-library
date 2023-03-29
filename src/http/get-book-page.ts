import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { actionGetIdBook } from '../store/actions/action-creaters';
import { PATH_BOOK_PAGE } from '../utils/constants/path-url';
import { REG_ERROR, REG_SUCCESS } from '../utils/constants/response-request';

import { $api } from './axios-create';

export const requestGetBookPage = async (dispatch: Dispatch<AnyAction>, id: number) => {
  try {
    const response = await $api.get(`${PATH_BOOK_PAGE}/${id}`);

    dispatch(actionGetIdBook(response.data));

    return REG_SUCCESS;
  } catch (err) {
    return REG_ERROR;
  }
};
