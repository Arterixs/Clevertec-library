import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import {
  bookingBookIdSelector,
  currentBookIdSelector,
  dateOrderSelector,
  userIdSelector,
} from '../../store/selectors/selectors';
import { IModalBooking } from '../../types/interface/interface';
import { getDayInString } from '../../utils/calendar/helpers';
import { BOOKING, BOOKING_RESET, TITLE_BOOKING_MODAL, TITLE_REBOOKIN_MODAL } from '../../utils/constants/text';
import {
  createObjectRequestBooking,
  sendRequestBooking,
  sendRequestReBooking,
  sendRequestResetBooking,
} from '../../utils/helpers';

import { ButtonClose } from './components/button-close';
import { ButtonSubmit } from './components/button-submit';
import { Calendar } from './modal-calendar/calendar';

import styles from './modal.module.css';

export const Modal = ({ isCall, toggleStateModal, isCallReset, toggleStateModalReset }: IModalBooking) => {
  const dispatch = useDispatch();
  const userId = useTypedSelector(userIdSelector);
  const dataOrder = useTypedSelector(dateOrderSelector);
  const bookId = useTypedSelector(bookingBookIdSelector);
  const currentBookId = useTypedSelector(currentBookIdSelector);
  const [disabled, setDisabled] = useState(true);
  const toggleButtonSubmit = () => setDisabled(!disabled);
  const dataBookingOrder = getDayInString(dataOrder);

  const clickInWrapper = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      if (isCallReset) {
        toggleStateModalReset();
      } else {
        toggleStateModal();
      }
    }
  };
  const objectRequest = createObjectRequestBooking(true, dataOrder, bookId, userId!);
  const objectRequestReBooking = createObjectRequestBooking(true, dataOrder, currentBookId, userId!);
  const submitBooking = () => sendRequestBooking(objectRequest, dispatch, toggleStateModal);
  const submitResetBooking = () => sendRequestResetBooking(bookId, dispatch, toggleStateModalReset);
  const submitReBooking = () => sendRequestReBooking(objectRequestReBooking, dispatch, toggleStateModalReset, bookId);

  return (
    <div
      className={styles.wrapper}
      onKeyUp={() => {}}
      onClick={clickInWrapper}
      role='button'
      tabIndex={0}
      data-test-id='modal-outer'
    >
      <div className={styles.modal} data-test-id='booking-modal'>
        <div className={styles.modal_header}>
          <h3 className={styles.title} data-test-id='modal-title'>
            {isCall ? TITLE_BOOKING_MODAL : TITLE_REBOOKIN_MODAL}
          </h3>
          <ButtonClose toggleState={isCallReset ? toggleStateModalReset : toggleStateModal} />
        </div>
        <Calendar toggleSubmit={toggleButtonSubmit} signalResetModal={isCallReset} dataOrder={dataBookingOrder} />
        <ButtonSubmit
          flag={false}
          text={BOOKING}
          disable={disabled}
          submit={isCallReset ? submitReBooking : submitBooking}
          data='booking-button'
        />
        {isCallReset && (
          <ButtonSubmit
            flag={true}
            text={BOOKING_RESET}
            disable={false}
            submit={submitResetBooking}
            data='booking-cancel-button'
          />
        )}
      </div>
    </div>
  );
};
