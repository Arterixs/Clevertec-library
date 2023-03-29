import { IFormForgotMail } from '../types/interface/interface';
import { PATH_AUTHORIZATION, PATH_FORGOT_PASSWORD } from '../utils/constants/path-url';
import { REG_ERROR, REG_SUCCESS } from '../utils/constants/response-request';

import { $apiBase } from './axios-create';

export const requestSendLetterChangePassword = async (data: IFormForgotMail) => {
  try {
    await $apiBase.post(`${PATH_AUTHORIZATION}${PATH_FORGOT_PASSWORD}`, { ...data });

    return REG_SUCCESS;
  } catch (err) {
    return REG_ERROR;
  }
};
