import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BookView } from '../../components/book-page/book-view';
import { NavList } from '../../components/book-page/nav-list';
import { ReviewView } from '../../components/book-page/review-view';
import { LoaderTwo } from '../../components/loaded/loader-two';
import { Modal } from '../../components/modal/modal';
import { ModalRecall } from '../../components/modal/modal-recall';
import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { bookPageBookIdSelector, categoryBooksSelector, responseErrorSelector } from '../../store/selectors/selectors';
import { getValidIdUrl, requetsBookPageData } from '../../utils/helpers';

export const BookPage = () => {
  const dispatch = useDispatch();
  const isCategory = useTypedSelector(categoryBooksSelector);
  const isError = useTypedSelector(responseErrorSelector);
  const dataBook = useTypedSelector(bookPageBookIdSelector);
  const [stateModalBooking, setStateModalBooking] = useState(false);
  const [stateModalResetBooking, setStateModalResetBooking] = useState(false);
  const [state, setState] = useState(false);
  const [stateModalRecall, setStateModalRecall] = useState(false);
  const callModalResetBooking = () => setStateModalResetBooking(!stateModalResetBooking);
  const callModalBooking = () => setStateModalBooking(!stateModalBooking);
  const callModalRecall = () => setStateModalRecall(!stateModalRecall);
  const toggleState = (flag: boolean) => setState(flag);
  const pageId = useRef(0)

  const params = useParams();
  const id = getValidIdUrl(params.id);

  useEffect(() => {
    if (pageId.current !== id)  {
      requetsBookPageData(dispatch, id, isCategory.length);
    }
    pageId.current = id
  }, [dispatch, id, isCategory]);

  if (stateModalBooking || stateModalResetBooking || stateModalRecall) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return (
    <main className='main-book-page'>
      <LoaderTwo />
      {(stateModalBooking || stateModalResetBooking) && (
        <Modal
          isCall={stateModalBooking}
          isCallReset={stateModalResetBooking}
          toggleStateModalReset={callModalResetBooking}
          toggleStateModal={callModalBooking}
        />
      )}
      {stateModalRecall && <ModalRecall closeModal={callModalRecall} state={state} />}
      <div className='main-navigation-books-page'>
        <NavList {...{ isError, dataBook, isCategory }} />
      </div>
      <div className={isError ? 'main-wrap-book-page_hidden' : 'main-wrap-book-page'}>
        {dataBook && (
          <div className='wrapper-book-page'>
            <BookView {...dataBook} toggleStateModal={callModalBooking} toggleStateModalReset={callModalResetBooking} />
            <ReviewView {...dataBook} callModal={callModalRecall} toggleState={toggleState} />
          </div>
        )}
      </div>
    </main>
  );
};
