import styles from './grade.module.css';

export const GradeEmpty = () => (
  <svg className={styles.star} data-test-id='star'>
    <use href='#star-empty' />
  </svg>
);
