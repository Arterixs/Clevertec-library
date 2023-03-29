import { useState } from 'react';

import { IPropsDropDown } from '../../../types/interface/interface';
import { ARRAY_MONTHS_DICTIONARY } from '../../../utils/calendar/constants';
import { convertMonth } from '../../../utils/calendar/helpers';

import styles from './drop-down.module.css';

export const DropDown = (props: IPropsDropDown) => {
  const [openItem, setOpenItem] = useState(false);
  const toggleListItem = () => setOpenItem(!openItem);
  const classList = openItem
    ? `${styles['list-item']} ${styles.active}`
    : `${styles['list-item']} ${styles['list-item_hidden']}`;
  const month = convertMonth(props.month);

  return (
    <div
      className={styles.container}
      data-test-id='month-select'
      onKeyUp={() => {}}
      onClick={toggleListItem}
      role='button'
      tabIndex={0}
    >
      <div className={styles['list-container']}>
        <span>{`${month} ${props.year}`}</span>
        <ul className={classList}>
          {ARRAY_MONTHS_DICTIONARY.map((item) => (
            <li className={styles.item} key={item.id}>
              <button onClick={() => props.changeMonth(item.id)} className={styles['button-item']} type='button'>
                {item.value}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className={openItem ? `${styles.button} ${styles.rotate}` : styles.button} type='button'>
        <svg className={styles['drop-arrow']}>
          <use href='#drop-arrow' />
        </svg>
      </button>
    </div>
  );
};
