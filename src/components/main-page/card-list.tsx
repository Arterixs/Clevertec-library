import { SyntheticEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { actionSetDataBooking } from '../../store/actions/action-creaters';
import { CardProps } from '../../types/types';
import { CLASSNAME_BUTTON_BOOK, CLASSNAME_BUTTON_BOOKED, CLASSNAME_STAR_LIST } from '../../utils/constants/constants';
import { URL_IMAGE } from '../../utils/constants/path-url';
import {
  convertingStarGrade,
  getAuthorString,
  getContentButtonCardBooks,
  stateDisabledButton,
} from '../../utils/helpers';
import { Star } from '../book-page/grades/star';

import { BackLight } from './backlight';
import { EmptyCard } from './empty-card';
import { FullCard } from './full-card';
import { Grades } from './grades';

export const CardList = (props: CardProps) => {
  const {
    rating,
    title,
    id,
    authors,
    image,
    booking,
    delivery,
    urlWay,
    search,
    userId,
    toggleStateModal,
    toggleStateModalReset,
  } = props;
  const dispatch = useDispatch();
  const author = getAuthorString(authors);
  const contentButton = getContentButtonCardBooks(booking, delivery);
  const disabled = stateDisabledButton(delivery?.handed, booking?.customerId, userId);
  const backLight = useCallback(
    (str: string) => <BackLight valueInput={search} valueTitle={str} key={id} />,
    [search, id]
  );
  const arrayStars = convertingStarGrade(rating);
  const clickBtn = (e: SyntheticEvent) => {
    e.preventDefault();
    toggleStateModal();
  };

  const clickedResetBook = (e: SyntheticEvent) => {
    e.preventDefault();
    const dateOrder = booking?.dateOrder;
    const bookingId = booking?.id;

    if (dateOrder && bookingId) {
      dispatch(actionSetDataBooking({ order: true, dateOrder, book: bookingId, currentBook: id }));
      toggleStateModalReset();
    }
  };

  return (
    <article data-test-id='card'>
      <Link to={`/books/${urlWay}/${id}`} className='book__list'>
        {image ? <FullCard img={`${URL_IMAGE}${image.url}`} /> : <EmptyCard />}
        <div className='book__content-wrapper'>
          <section className='book__list_name'>
            <h2 className='book__list_title'>{backLight(title)}</h2>
          </section>
          <section className='wrapper-author_list'>
            <h3 className='book__list_author'>{author}</h3>
          </section>
          <div className='book__list_grade'>
            <div className='book__grade-container'>
              {rating ? (
                arrayStars.map((item) => (
                  <Star key={item.id} dataTestId={item.dataTestId} href={item.href} className={CLASSNAME_STAR_LIST} />
                ))
              ) : (
                <Grades />
              )}
            </div>
            <button
              onClick={booking?.order ? clickedResetBook : clickBtn}
              className={booking?.order ? CLASSNAME_BUTTON_BOOKED : CLASSNAME_BUTTON_BOOK}
              disabled={disabled}
              type='button'
              data-test-id='booking-button'
            >
              <span className='text'>{contentButton}</span>
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};
