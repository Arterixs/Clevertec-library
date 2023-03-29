import { DAYS_WEEK } from '../../../utils/calendar/constants';

import styles from './days-week.module.css';

export const DaysWeek = () => (
  <div className={styles.wrapper}>
    <ul className={styles['list-items']}>
      {DAYS_WEEK.map((item) => (
        <li className={styles.day} key={item.id}>
          {item.value}
        </li>
      ))}
    </ul>
  </div>
);
