import styles from './grade.module.css';

export const GradeFull = () => (
  <svg className={styles.star} data-test-id='star'>
    <use data-test-id='star-active' href='#star-full' />
  </svg>
);
