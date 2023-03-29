import { ActionLoad } from '../../types/enum';
import { IResponseRequestOfServer } from '../../types/interface/interface';
import { ActionRespOfReqServer } from '../../types/types';
import { respRequestServer } from '../state/req-res-state';

export const reducerResponseOfRequest = (
  state: IResponseRequestOfServer = respRequestServer,
  action: ActionRespOfReqServer
): IResponseRequestOfServer => {
  switch (action.type) {
    case ActionLoad.LOADED:
      return { ...state, isLoaded: action.data };
    case ActionLoad.ERROR_BOOKING:
      return { ...state, isErrorBooking: action.data.isErrorBooking, open: action.data.open, text: action.data.text };
    case ActionLoad.ERROR:
      return { ...state, ...action.data };
    case ActionLoad.CLOSE_WINDOW:
      return { ...state, open: action.data };
    default:
      return state;
  }
};
