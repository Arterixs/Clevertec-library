import { IButtonProfileProps } from '../../../../types/interface/interface';

import styles from './button-recall.module.css';

export const ButtonRecallProfile = ({ text, disable, func, data, className }: IButtonProfileProps) => (
  <button className={className} type='button' disabled={disable} onClick={func} data-test-id={data}>
    <span className={styles.span}>{text}</span>
  </button>
);
