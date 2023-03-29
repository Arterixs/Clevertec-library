import { IPropsButtonModalSubBooking } from '../../../types/interface/interface';

import styles from './button-sub.module.css';

export const ButtonSubmit = ({ text, disable, submit, data, flag }: IPropsButtonModalSubBooking) => (
  <button
    type='button'
    className={flag ? `${styles.submit} ${styles.reset}` : styles.submit}
    disabled={disable}
    onClick={submit}
    data-test-id={data}
  >
    <span>{text}</span>
  </button>
);
