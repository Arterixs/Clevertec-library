import { RequestBooking } from '../types/types';
import { PATH_BOOKING } from '../utils/constants/path-url';
import { REG_ERROR, REG_SUCCESS } from '../utils/constants/response-request';

import { $api } from './axios-create';

export const requestBooking = async (data: RequestBooking) => {
  try {
    await $api.post(PATH_BOOKING, { ...data });

    return REG_SUCCESS;
  } catch (err) {
    return REG_ERROR;
  }
};
