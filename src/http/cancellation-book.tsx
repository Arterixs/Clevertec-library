import { PATH_BOOKING } from '../utils/constants/path-url';
import { REG_ERROR, REG_SUCCESS } from '../utils/constants/response-request';

import { $api } from './axios-create';

export const requestResetBooking = async (id: number) => {
  try {
    await $api.delete(`${PATH_BOOKING}/${id}`);

    return REG_SUCCESS;
  } catch (err) {
    return REG_ERROR;
  }
};
