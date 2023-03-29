import { TEXT_BTN_RECALL_MODAL } from '../../../utils/constants/text';
import { REVISE_RATING } from '../../../utils/constants/text-button';

import styles from './button-sub.module.css';

export const ButtonSetRecall = ({ submit, state }: { submit: () => void; state?: boolean }) => (
  <button type='button' className={styles.submit} onClick={submit} data-test-id='button-comment'>
    <span>{state ? REVISE_RATING : TEXT_BTN_RECALL_MODAL}</span>
  </button>
);
