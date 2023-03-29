import { IBodyAuthResponse } from '../types/interface/response';
import { PATH_UPDATE_AVATAR } from '../utils/constants/path-url';
import { ERROR_RESPONSE } from '../utils/constants/response-request';

import { $api } from './axios-create';

export const requestUpdataAvatar = async (data: { avatar: number }, id: number) => {
  try {
    const response = await $api.put<IBodyAuthResponse>(`${PATH_UPDATE_AVATAR}/${id}`, { ...data });

    return response.data;
  } catch (err) {
    return ERROR_RESPONSE;
  }
};
