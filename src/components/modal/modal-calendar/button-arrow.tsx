import styles from './button-arrow.module.css';

export const ButtonArrow = (props: { flagPosition: boolean; click: () => void; data: string }) => (
  <button className={styles.button} type='button' onClick={props.click} data-test-id={props.data}>
    <svg className={props.flagPosition ? styles.arrow : `${styles.arrow} ${styles['arrow-down']}`}>
      <use href='#arrow-date' />
    </svg>
  </button>
);
