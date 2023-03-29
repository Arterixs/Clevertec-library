import { IButtonDaysProps } from '../../../types/interface/interface';

import styles from './button-days.module.css';

export const ButtonDays = ({
  day,
  weekend,
  currentDay,
  dayBooking,
  calculateDateBooking,
  bookingDay,
}: IButtonDaysProps) => {
  if (dayBooking) {
    const styleButton = currentDay ? `${styles.button} ${styles.current}` : styles.button;
    const styleSpan = currentDay ? (bookingDay === day ? styles.active : styles['current-no-booking']) : styles.booking;

    return (
      <button
        className={bookingDay === day ? `${styleButton} ${styles['button-active']}` : styleButton}
        onClick={() => calculateDateBooking(day)}
        disabled={false}
        type='button'
        data-test-id='day-button'
      >
        <span className={bookingDay === day ? styles.active : styleSpan}>{day}</span>
      </button>
    );
  }

  if (weekend) {
    const styleButton = currentDay ? `${styles.current} ${styles['current-weekend']}` : styles.usually;

    return (
      <button className={`${styles.button} ${styles.weekend}`} disabled={true} type='button' data-test-id='day-button'>
        <span className={styleButton}>{day}</span>
      </button>
    );
  }

  return (
    <button className={styles.button} disabled={true} type='button' data-test-id='day-button'>
      <span>{day}</span>
    </button>
  );
};
