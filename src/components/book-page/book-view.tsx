import { useDispatch } from 'react-redux';

import { actionBookId, actionSetDataBooking } from '../../store/actions/action-creaters';
import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { userIdSelector } from '../../store/selectors/selectors';
import { PropsBookPageBookView } from '../../types/types';
import { CLASSNAME_META_BUTTON_BOOK, CLASSNAME_META_BUTTON_BOOKED } from '../../utils/constants/constants';
import {
  converterBooksCover,
  getAuthorString,
  getContentButtonCardBooks,
  stateDisabledButton,
} from '../../utils/helpers';

import { CoverBook } from './cover-book';
import { CoverEmpty } from './cover-empty';

export const BookView = (props: PropsBookPageBookView) => {
  const { title, authors, booking, delivery, description, images, id, toggleStateModal, toggleStateModalReset } = props;
  const userId = useTypedSelector(userIdSelector);
  const dispatch = useDispatch();
  const authorString = getAuthorString(authors);
  const contentButton = getContentButtonCardBooks(booking, delivery);
  const amountBooksCover = images ? converterBooksCover(images) : [];
  const amountSliderCovers = amountBooksCover.length;
  const conditionRenderCheck = images && amountSliderCovers > 1;
  const disabled = stateDisabledButton(delivery?.handed, booking?.customerId, userId);

  const clickBooking = () => {
    dispatch(actionBookId(id));
    toggleStateModal();
  };

  const clickedResetBooking = () => {
    const dateOrder = booking?.dateOrder;
    const bookingId = booking?.id;

    if (dateOrder && bookingId) {
      dispatch(actionSetDataBooking({ order: true, dateOrder, book: bookingId, currentBook: id }));
      toggleStateModalReset();
    }
  };

  return (
    <section className={conditionRenderCheck ? 'head-books-page' : 'head-books-page_single'}>
      {images ? <CoverBook {...{ amountSliderCovers, amountBooksCover }} /> : <CoverEmpty />}
      <section className='meta-info'>
        <h2 data-test-id='book-title' className='meta-info__books'>
          {title}
        </h2>
        <h3 className='meta-info__author'>{authorString}</h3>
        <button
          className={booking?.order ? CLASSNAME_META_BUTTON_BOOKED : CLASSNAME_META_BUTTON_BOOK}
          type='button'
          onClick={booking?.order ? clickedResetBooking : clickBooking}
          disabled={disabled}
          data-test-id='booking-button'
        >
          <span className='button-content'>{contentButton}</span>
        </button>
      </section>
      <section className={conditionRenderCheck ? 'description description_swip' : 'description'}>
        <h3 className='descriprion__name'>О книге</h3>
        <div className='descrtiption-content'>
          <p className='descr-one'>{description}</p>
        </div>
      </section>
    </section>
  );
};
