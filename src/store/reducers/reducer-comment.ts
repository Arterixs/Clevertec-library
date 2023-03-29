import { ActionLoad } from '../../types/enum';
import { IStateComment } from '../../types/interface/interface';
import { ActionComment } from '../../types/types';
import { CommentState } from '../state/comment-state';

export const reducerComment = (state: IStateComment = CommentState, action: ActionComment): IStateComment => {
  switch (action.type) {
    case ActionLoad.SET_COMMENT:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
