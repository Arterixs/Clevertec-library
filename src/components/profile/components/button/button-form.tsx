import { IButtonFormProps } from '../../../../types/interface/interface';

import styles from './button-form.module.css';

export const ButtonForm = ({ text, types, disable, func, data }: IButtonFormProps) => (
  <button
    className={types ? `${styles.button} ${styles.active}` : styles.button}
    type={types ? 'submit' : 'button'}
    disabled={disable}
    onClick={func}
    data-test-id={data}
  >
    <span className={disable ? `${styles.span} ${styles['span-disabled']}` : styles.span}>{text}</span>
  </button>
);
