import { RequestBooking } from '../types/types';
import { PATH_BOOKING } from '../utils/constants/path-url';
import { REG_ERROR, REG_SUCCESS } from '../utils/constants/response-request';

import { $api } from './axios-create';

export const requestRebooking = async (data: RequestBooking, id: number) => {
  try {
    await $api.put(`${PATH_BOOKING}/${id}`, { ...data });

    return REG_SUCCESS;
  } catch (err) {
    return REG_ERROR;
  }
};
