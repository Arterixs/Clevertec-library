import { AxiosError } from 'axios';

import { IFormAuthSubmit } from '../types/interface/interface';
import { PATH_AUTH_PAGE,PATH_AUTHORIZATION } from '../utils/constants/path-url';
import { REG_ERROR, REG_ERROR_400, REG_SUCCESS } from '../utils/constants/response-request';

import { $apiBase } from './axios-create';

export const requestAuthorization = async (data: IFormAuthSubmit) => {
  try {
    const response = await $apiBase.post(`${PATH_AUTHORIZATION}${PATH_AUTH_PAGE}`, { ...data });
    const result = await response.data;

    localStorage.setItem('token', result.jwt);

    return REG_SUCCESS;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 400) {
      return REG_ERROR_400;
    }

    return REG_ERROR;
  }
};
