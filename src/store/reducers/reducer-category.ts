import { ActionLoad } from '../../types/enum';
import { IStateCategory } from '../../types/interface/interface';
import { ActionsCategory } from '../../types/types';
import { stateCategory } from '../state/state-category';

export const reducerCategory = (state: IStateCategory = stateCategory, action: ActionsCategory): IStateCategory => {
  switch (action.type) {
    case ActionLoad.GET_CATEGORY_BOOKS:
      return { ...state, category: [...action.data] };
    default:
      return state;
  }
};
