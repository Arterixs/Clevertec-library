import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { actionListBook } from '../store/actions/action-creaters';
import { IListBooks } from '../types/interface/response';
import { PATH_BOOK_PAGE } from '../utils/constants/path-url';
import { REG_ERROR, REG_SUCCESS } from '../utils/constants/response-request';

import { $api } from './axios-create';

export const requestGetListBooks = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await $api.get<IListBooks>(PATH_BOOK_PAGE);

    dispatch(actionListBook(response.data));

    return REG_SUCCESS;
  } catch (err) {
    return REG_ERROR;
  }
};
