import { IResponseNewAvatar } from '../types/interface/response';
import { PATH_NEW_AVATAR } from '../utils/constants/path-url';
import { ERROR_RESPONSE } from '../utils/constants/response-request';

import { $api } from './axios-create';

export const requestSetAvatar = async (data: FormData) => {
  try {
    const response = await $api.post<IResponseNewAvatar[]>(PATH_NEW_AVATAR, data);

    return response.data[0].id;
  } catch (err) {
    return ERROR_RESPONSE;
  }
};
