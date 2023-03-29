import styles from './btn-close.module.css';

export const ButtonClose = ({ toggleState }: { toggleState: () => void }) => (
  <button className={styles.button} type='button' onClick={toggleState} data-test-id='modal-close-button'>
    <span className={styles.left} />
    <span className={styles.right} />
  </button>
);
