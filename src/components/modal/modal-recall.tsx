import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { bookPageCommentSelector, bookPageIdBookSelector, userIdSelector } from '../../store/selectors/selectors';
import { ICommentsMeta } from '../../types/interface/response';
import { PLACEHOLDER_TEXTAREA_RECALL, TITLE_GRADE_MODAL_RECALL, TITLE_RECALL_MODAL } from '../../utils/constants/text';
import { checkCommentUser, createObjectRequestComment, sendRequestChangeComment, sendRequestNewComment } from '../../utils/helpers';

import { ButtonSetRecall } from './components/btn-recall';
import { ButtonClose } from './components/button-close';
import { GradeContainer } from './components/grade-container/grade-container';

import styles from './modal.module.css'

export const ModalRecall = ({ closeModal, state }: { closeModal: () => void; state: boolean }) => {
  const dispatch = useDispatch();
  const bookId = useTypedSelector(bookPageIdBookSelector);
  const userId = useTypedSelector(userIdSelector);
  const bookComments = useTypedSelector(bookPageCommentSelector);
  const objectComment = checkCommentUser(bookComments, userId);
  const [valueText, setValueText] = useState(() => (state ? objectComment[0]!.text : ''));
  const [amountStars, setStars] = useState(1);
  const clickInWrapper = (e: SyntheticEvent) => e.target === e.currentTarget && closeModal();
  const setStarsRating = (amount: number) => setStars(amount);
  const objectRequest = createObjectRequestComment(valueText, amountStars, bookId!, userId!);
  const submitComment = () => sendRequestNewComment(objectRequest, dispatch, closeModal);
  const changeComment = () =>
    sendRequestChangeComment(objectRequest, dispatch, closeModal, objectComment[0]!.commentId);

  useEffect(() => {
    if (objectComment[0]) {
      setStarsRating(Math.floor(objectComment[0]!.rating));
    }
  }, [objectComment]);

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
            <GradeContainer callback={setStarsRating} stars={Math.floor(objectComment[0]!.rating)} />
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
            defaultValue={state ? objectComment[0]!.text : ''}
          />
        </div>
        <ButtonSetRecall submit={state ? changeComment : submitComment} />
      </div>
    </div>
  );
};
