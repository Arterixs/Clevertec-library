import { IPropsDatePicker } from '../../../types/interface/interface';
import { NO_DATE } from '../../../utils/calendar/constants';
import { getCurrentCalendar } from '../../../utils/calendar/helpers';

import { ButtonDays } from './button-days';

import styles from './date-picker.module.css';

export const DatePicker = ({
  newMonth,
  newYear,
  currentDay,
  currentMonth,
  currentYear,
  calculateDateBooking,
  bookingDay,
}: IPropsDatePicker) => {
  const checkCurrentDay = newMonth === currentMonth && newYear === currentYear;
  const arraysDayInMonth = checkCurrentDay
    ? getCurrentCalendar(newMonth, currentYear, currentDay)
    : getCurrentCalendar(newMonth, newYear, NO_DATE, false);

  return (
    <div className={styles.wrapper}>
      {arraysDayInMonth.map((item) => (
        <ButtonDays
          day={item.day}
          weekend={item.isWeekend}
          currentDay={item.isCurrentDay}
          dayBooking={item.isBooking}
          calculateDateBooking={calculateDateBooking}
          bookingDay={bookingDay}
          key={item.id}
        />
      ))}
    </div>
  );
};
