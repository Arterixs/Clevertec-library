import { Dispatch, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { requestGetBookPage } from '../../../../http/get-book-page';
import { actionLoadedResponse, actionSetComment } from '../../../../store/actions/action-creaters';
import { useTypedSelector } from '../../../../store/hooks/use-typed-selector';
import { getHistoruBooksSelector, getUserCommentSelector } from '../../../../store/selectors/selectors';
import { PlugFlag } from '../../../../types/enum';
import { ICommentsUser } from '../../../../types/interface/response';
import {
  CLASSNAME_BUTTON_CHANGE_COMMENT_HISTORY,
  CLASSNAME_BUTTON_RECALL_HISTORY,
} from '../../../../utils/constants/constants';
import { PLUG_HISTORY } from '../../../../utils/constants/text';
import { ESTIMATE, REVISE_RATING } from '../../../../utils/constants/text-button';
import { chekedcommentInBook, getInfoComment } from '../../../../utils/helpers';
import { ModalProfile } from '../../../modal/modal-profile';
import { ButtonRecallProfile } from '../../components/button/button-recall';
import { CardWindow } from '../../components/card-book/card-window';
import { Plug } from '../../components/plug/plug';

import styles from './container.module.css';

export const HistoryContainer = () => {
  const dispatch = useDispatch();
  const historyBooksInfo = useTypedSelector(getHistoruBooksSelector);
  const historyComments = useTypedSelector(getUserCommentSelector);
  const [recall, setRecall] = useState(false);
  const [stateModalRecall, setStateModalRecall] = useState(false);
  const callModalRecall = () => setStateModalRecall(!stateModalRecall);

  const changeRating = async (
    e: SyntheticEvent,
    bookId: number | null | undefined,
    historyComments: ICommentsUser[] | null | undefined,
    dispatch: Dispatch<AnyAction>
  ) => {
    e.preventDefault();
    if (!bookId || !historyComments) return;
    const objectDataComment = getInfoComment(historyComments, bookId).filter((item) => item !== null);

    if (objectDataComment[0]) {
      dispatch(actionSetComment(objectDataComment[0]));
      dispatch(actionLoadedResponse(true));
      await requestGetBookPage(dispatch, bookId);
      dispatch(actionLoadedResponse(false));
      setRecall(true);
      callModalRecall();
    }
  };

  const setComment = async (
    e: SyntheticEvent,
    bookId: number | null | undefined,
    historyComments: ICommentsUser[] | null | undefined,
    dispatch: Dispatch<AnyAction>
  ) => {
    e.preventDefault();
    if (!bookId || !historyComments) return;
    dispatch(actionLoadedResponse(true));
    await requestGetBookPage(dispatch, bookId);
    dispatch(actionLoadedResponse(false));
    setRecall(false);
    callModalRecall();
  };

  return (
    <div className={styles['card-chronicle']}>
      {stateModalRecall && <ModalProfile closeModal={callModalRecall} state={recall} />}
      {!historyBooksInfo && <Plug title={PLUG_HISTORY} flag={PlugFlag.NULL} />}
      {historyBooksInfo && (
        <Swiper
          pagination={{
            clickable: true,
            type: 'bullets',
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            500: {
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
          className='slider-history'
          modules={[Pagination]}
        >
          {historyBooksInfo.map((it) => (
            <SwiperSlide key={it?.id} data-test-id='history-slide'>
              <CardWindow book={it}>
                <ButtonRecallProfile
                  text={chekedcommentInBook(it?.id, historyComments) ? REVISE_RATING : ESTIMATE}
                  className={
                    chekedcommentInBook(it?.id, historyComments)
                      ? CLASSNAME_BUTTON_CHANGE_COMMENT_HISTORY
                      : CLASSNAME_BUTTON_RECALL_HISTORY
                  }
                  disable={false}
                  data='history-review-button'
                  func={
                    chekedcommentInBook(it?.id, historyComments)
                      ? (e) => changeRating(e, it?.id, historyComments, dispatch)
                      : (e) => setComment(e, it?.id, historyComments, dispatch)
                  }
                />
              </CardWindow>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
