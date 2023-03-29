import styles from './check.module.css';

export const Check = () => (
  <svg className={styles.check} data-test-id='checkmark'>
    <use href='#check-mark' />
  </svg>
);
