import { IRegisterRestore } from '../../../types/interface/interface';

import styles from './register-link.module.css';

export const RegisterRestore = (props: IRegisterRestore) => {
  const { textButton, question, disabled } = props;

  return (
    <div className={styles.wrapper}>
      <button type='submit' className={styles.button} disabled={disabled}>
        {textButton}
      </button>
      <div className={styles.container}>
        <p className={styles.content}>{question}</p>
      </div>
    </div>
  );
};
