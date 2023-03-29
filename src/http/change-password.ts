import { IFormRestoreSubmit } from '../types/interface/interface';
import { PATH_AUTHORIZATION, PATH_RESET_PASSWORD } from '../utils/constants/path-url';
import { REG_ERROR, REG_SUCCESS } from '../utils/constants/response-request';

import { $apiBase } from './axios-create';

export const requestChangePassword = async (data: IFormRestoreSubmit) => {
  try {
    await $apiBase.post(`${PATH_AUTHORIZATION}${PATH_RESET_PASSWORD}`, { ...data });

    return REG_SUCCESS;
  } catch (err) {
    return REG_ERROR;
  }
};
