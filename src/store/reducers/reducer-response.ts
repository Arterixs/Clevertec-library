import { ActionLoad } from '../../types/enum';
import { IResponseState } from '../../types/interface/interface';
import { ActionResponse } from '../../types/types';
import { responseState } from '../state/response-state';

export const reducerResponse = (state: IResponseState = responseState, action: ActionResponse): IResponseState => {
  switch (action.type) {
    case ActionLoad.AUTH:
      return { ...state, auth: action.data };
    case ActionLoad.BODY_AUTH:
      return { ...state, user: action.data };
    default:
      return state;
  }
};
