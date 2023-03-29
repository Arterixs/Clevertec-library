import { useState } from 'react';

import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { userIdSelector } from '../../store/selectors/selectors';
import { ICommentsMeta } from '../../types/interface/response';
import { GRADE_BOOK, REVISE_RATING } from '../../utils/constants/text-button';
import { chekedComment } from '../../utils/helpers';

import { ButtonRecall } from './button-recall';

export const RecallEmpty = (props: {
  coments: ICommentsMeta[];
  callModal: () => void;
  toggleState: (flag: boolean) => void;
}) => {
  const { coments, callModal, toggleState } = props;
  const [stateRecall, setRecall] = useState(false);
  const toggleStateRecall = () => setRecall(!stateRecall);
  const userId = useTypedSelector(userIdSelector);
  const isCheckComent = chekedComment(coments, userId);
  const changeRecall = () => {
    toggleState(true);
    callModal();
  };

  const gradeBook = () => {
    toggleState(false);
    callModal();
  };

  return (
    <section className='review-block-empty'>
      <section className={stateRecall ? 'meta-info-title-block meta-info-title-block_active' : 'meta-info-title-block'}>
        <h3 className='ratio-block__ratio'>Отзывы</h3>
        <p className='count-comments'>0</p>
        <ButtonRecall {...{ toggleStateRecall, stateRecall }} />
      </section>
      <button
        className={
          isCheckComent
            ? 'meta-info__button__change__comment  meta-info__button_size'
            : 'meta-info__button meta-info__button_size'
        }
        type='button'
        data-test-id='button-rate-book'
        onClick={isCheckComent ? changeRecall : gradeBook}
      >
        <span className='button-content'>{isCheckComent ? REVISE_RATING : GRADE_BOOK}</span>
      </button>
    </section>
  );
};
