import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { DECEMBER, JANUARY, NO_DATE, ONE_MONTH, ONE_YEAR } from '../../../utils/calendar/constants';
import { currentDate, dispatchDateOrder } from '../../../utils/calendar/helpers';

import { ButtonArrow } from './button-arrow';
import { DatePicker } from './date-picker';
import { DaysWeek } from './days-week';
import { DropDown } from './drop-down';

import styles from './calendar.module.css';

export const Calendar = ({
  toggleSubmit,
  signalResetModal,
  dataOrder,
}: {
  toggleSubmit: () => void;
  signalResetModal: boolean;
  dataOrder: number;
}) => {
  const dispatch = useDispatch();
  const date = new Date();
  const { day, month, year } = currentDate(date);
  const [newMonth, setMonth] = useState(month);
  const [newYear, setYear] = useState(year);
  const [bookingDay, setBookingDay] = useState(() => (signalResetModal ? dataOrder : NO_DATE));
  const [currentDay] = useState(day);
  const [currentMonth] = useState(month);
  const [currentYear] = useState(year);
  const incrementMonth = () =>
    newMonth === DECEMBER ? (setMonth(JANUARY), setYear(newYear + ONE_YEAR)) : setMonth(newMonth + ONE_MONTH);
  const decrementMonth = () =>
    newMonth === JANUARY ? (setMonth(DECEMBER), setYear(newYear - ONE_YEAR)) : setMonth(newMonth - ONE_MONTH);
  const changeMonth = (month: number) => setMonth(month);
  const calculateDateBooking = (day: number) => {
    if (!bookingDay) {
      toggleSubmit();
    }
    if (signalResetModal) {
      toggleSubmit();
    }
    setBookingDay(day);
    dispatchDateOrder(currentYear, currentMonth, day, dispatch);
  };

  return (
    <div className={styles.calendar} data-test-id='calendar'>
      <div className={styles['wrapper-drop']}>
        <DropDown month={newMonth} year={newYear} changeMonth={changeMonth} />
        <div className={styles['wrapper-btn']}>
          <ButtonArrow click={decrementMonth} flagPosition={true} data='button-prev-month' />
          <ButtonArrow click={incrementMonth} flagPosition={false} data='button-next-month' />
        </div>
      </div>
      <div className={styles['wrapper-date']}>
        <DaysWeek />
        <DatePicker
          newMonth={newMonth}
          newYear={newYear}
          currentYear={currentYear}
          currentMonth={currentMonth}
          currentDay={currentDay}
          calculateDateBooking={calculateDateBooking}
          bookingDay={bookingDay}
        />
      </div>
    </div>
  );
};
