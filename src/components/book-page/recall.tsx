import { useState } from 'react';

import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { userIdSelector } from '../../store/selectors/selectors';
import { ICommentsMeta } from '../../types/interface/response';
import { GRADE_BOOK, REVISE_RATING } from '../../utils/constants/text-button';
import { chekedComment, sortingComments } from '../../utils/helpers';

import { ButtonRecall } from './button-recall';
import { Comment } from './coment';

export const Recall = (props: {
  coments: ICommentsMeta[];
  callModal: () => void;
  toggleState: (flag: boolean) => void;
}) => {
  const { coments, callModal, toggleState } = props;
  const sortComment = sortingComments(coments);
  const [stateRecall, setRecall] = useState(true);
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
    <section className={stateRecall ? 'review-block' : 'review-block review-block_closed'} data-test-id='reviews'>
      <section
        className={
          stateRecall
            ? 'meta-info-title-block meta-info-title-block_active'
            : 'meta-info-title-block meta-info-title-block_closed'
        }
      >
        <h3 className='ratio-block__ratio'>Отзывы</h3>
        <p className='count-comments'>{coments.length}</p>
        <ButtonRecall {...{ toggleStateRecall, stateRecall }} />
      </section>
      <section className={stateRecall ? 'comments' : 'comments comments_closed'}>
        {sortComment.map((item) => (
          <Comment {...item} key={item.id} />
        ))}
      </section>
      <button
        className={
          isCheckComent
            ? 'meta-info__button__change__comment  meta-info__button_size meta-info__button_size_recall'
            : 'meta-info__button meta-info__button_size meta-info__button_size_recall'
        }
        type='button'
        data-test-id='button-rate-book'
        onClick={isCheckComent ? changeRecall : gradeBook}
        disabled={false}
      >
        <span className='button-content'>{isCheckComent ? REVISE_RATING : GRADE_BOOK}</span>
      </button>
    </section>
  );
};
