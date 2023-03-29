import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../../../store/hooks/use-typed-selector';
import {
  getBookingBookIdSelector,
  getBookingDateSelector,
  getBookingInfoSelector,
} from '../../../../store/selectors/selectors';
import { PlugFlag } from '../../../../types/enum';
import { CLASSNAME_BUTTON_RECALL_BOOKING } from '../../../../utils/constants/constants';
import { PLUG_BOOKING, PLUG_BOOKING_DELAY, PLUG_BOOKING_SUBTITLE } from '../../../../utils/constants/text';
import { TEXT_BUTTON_BOOKING } from '../../../../utils/constants/text-button';
import { calculateDateDelay, sendResetBooking } from '../../../../utils/helpers';
import { ButtonRecallProfile } from '../../components/button/button-recall';
import { CardBook } from '../../components/card-book/card-book';
import { Plug } from '../../components/plug/plug';

import styles from './container.module.css';

export const BookingContainer = () => {
  const dispatch = useDispatch();
  const bookingInfo = useTypedSelector(getBookingInfoSelector);
  const bookId = useTypedSelector(getBookingBookIdSelector);
  const bookdateOrder = useTypedSelector(getBookingDateSelector);
  const dateDelay = calculateDateDelay(bookdateOrder);

  const clickResetBooking = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!bookId) return;
    sendResetBooking(bookId, dispatch);
  };

  return (
    <div className={styles['card-chronicle']}>
      {(!bookingInfo || dateDelay) && (
        <Plug
          title={dateDelay ? PLUG_BOOKING_DELAY : PLUG_BOOKING}
          subtitle={PLUG_BOOKING_SUBTITLE}
          flag={dateDelay ? PlugFlag.DELAY : PlugFlag.NULL}
        />
      )}
      <CardBook book={bookingInfo}>
        <ButtonRecallProfile
          text={TEXT_BUTTON_BOOKING}
          className={CLASSNAME_BUTTON_RECALL_BOOKING}
          disable={false}
          data='cancel-booking-button'
          func={clickResetBooking}
        />
      </CardBook>
    </div>
  );
};
