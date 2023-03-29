import { AxiosError } from 'axios';

import { IFormRegSubmit } from '../types/interface/interface';
import { PATH_AUTH_PAGE, PATH_AUTHORIZATION, PATH_REGISTRATION } from '../utils/constants/path-url';
import { REG_ERROR, REG_ERROR_400, REG_SUCCESS } from '../utils/constants/response-request';

import { $apiBase } from './axios-create';

export const requestRegistration = async (data: IFormRegSubmit) => {
  try {
    await $apiBase.post(`${PATH_AUTHORIZATION}${PATH_AUTH_PAGE}${PATH_REGISTRATION}`, { ...data });

    return REG_SUCCESS;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 400) {
      return REG_ERROR_400;
    }

    return REG_ERROR;
  }
};
