import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { actionBody } from '../store/actions/action-creaters';
import { IBodyAuthResponse } from '../types/interface/response';
import { PATH_USER } from '../utils/constants/path-url';
import { REG_ERROR, REG_SUCCESS } from '../utils/constants/response-request';

import { $api } from './axios-create';

export const requestGetUser = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await $api.get<IBodyAuthResponse>(PATH_USER);

    dispatch(actionBody(response.data));

    return REG_SUCCESS;
  } catch (err) {
    return REG_ERROR;
  }
};
