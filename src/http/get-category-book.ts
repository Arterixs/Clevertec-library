import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { actionCategoryBook } from '../store/actions/action-creaters';
import { ICategoryBooks } from '../types/interface/response';
import { PATH_CATEGORIES } from '../utils/constants/path-url';
import { REG_ERROR, REG_SUCCESS } from '../utils/constants/response-request';

import { $api } from './axios-create';

export const requestGetCategoryBooks = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await $api.get<ICategoryBooks>(PATH_CATEGORIES);

    dispatch(actionCategoryBook(response.data));

    return REG_SUCCESS;
  } catch (err) {
    return REG_ERROR;
  }
};
