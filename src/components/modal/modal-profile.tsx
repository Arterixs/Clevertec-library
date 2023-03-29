import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { bookPageIdBookSelector, getCommentUserSelector, userIdSelector } from '../../store/selectors/selectors';
import { PLACEHOLDER_TEXTAREA_RECALL, TITLE_GRADE_MODAL_RECALL, TITLE_RECALL_MODAL } from '../../utils/constants/text';
import { createObjectRequestComment, sendRequestChangeComment, sendRequestNewComment } from '../../utils/helpers';

import { ButtonSetRecall } from './components/btn-recall';
import { ButtonClose } from './components/button-close';
import { GradeContainer } from './components/grade-container/grade-container';

import styles from './modal.module.css';

export const ModalProfile = ({ closeModal, state }: { closeModal: () => void; state: boolean }) => {
  const dispatch = useDispatch();
  const userId = useTypedSelector(userIdSelector);
  const bookingId = useTypedSelector(bookPageIdBookSelector);
  const commentInfo = useTypedSelector(getCommentUserSelector);
  const [valueText, setValueText] = useState(() => (state ? commentInfo.text : ''));
  const [amountStars, setStars] = useState(1);
  const clickInWrapper = (e: SyntheticEvent) => e.target === e.currentTarget && closeModal();
  const setStarsRating = (amount: number) => setStars(amount);
  const objectRequest = createObjectRequestComment(
    valueText,
    amountStars,
    state ? commentInfo.bookId : bookingId!,
    userId!
  );
  const submitChangeComment = () =>
    sendRequestChangeComment(objectRequest, dispatch, closeModal, commentInfo.commentId);
  const submitComment = () => sendRequestNewComment(objectRequest, dispatch, closeModal);

  useEffect(() => {
    setStarsRating(Math.floor(commentInfo.rating));
  }, [commentInfo]);

  return (
    <div
      className={styles.wrapper}
      onKeyUp={() => {}}
      onClick={clickInWrapper}
      role='button'
      tabIndex={0}
      data-test-id='modal-outer'
    >
      <div className={styles.modal} data-test-id='modal-rate-book'>
        <div className={styles.modal_header}>
          <h3 className={styles.title} data-test-id='modal-title'>
            {TITLE_RECALL_MODAL}
          </h3>
          <ButtonClose toggleState={closeModal} />
        </div>
        <div className={styles['grades-block']}>
          <h2 className={styles.subtitle}>{TITLE_GRADE_MODAL_RECALL}</h2>
          {state ? (
            <GradeContainer callback={setStarsRating} stars={Math.floor(commentInfo.rating)} />
          ) : (
            <GradeContainer callback={setStarsRating} />
          )}
        </div>
        <div className={styles['wrapper-textarea']}>
          <textarea
            className={styles.textarea}
            placeholder={PLACEHOLDER_TEXTAREA_RECALL}
            onChange={(e) => setValueText(e.target.value)}
            data-test-id='comment'
            defaultValue={state ? commentInfo.text : ''}
          />
        </div>
        <ButtonSetRecall submit={state ? submitChangeComment : submitComment} state={state} />
      </div>
    </div>
  );
};
