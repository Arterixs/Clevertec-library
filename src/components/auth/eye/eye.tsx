import { IEye } from '../../../types/interface/interface';
import styles from './eye.module.css';

export const Eye = (props: IEye) => (
  <button
    className={styles.button}
    type='button'
    onClick={props.func}
    data-test-id={props.flag ? 'eye-opened' : 'eye-closed'}
  >
    <svg className={styles.eye}>
      <use href={props.flag ? '#eye-open' : '#eye-close'} />
    </svg>
  </button>
);
