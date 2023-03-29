import { Link } from 'react-router-dom';

import { AuthRegisterLink } from '../../../types/types';

import styles from './register-link.module.css';

export const RegisterAuth = (props: AuthRegisterLink) => {
  const { textButton, path, question, textLink } = props;

  return (
    <div className={styles.wrapper}>
      <button type='submit' className={styles.button}>
        {textButton}
      </button>
      <div className={styles.container}>
        <p className={styles.content}>{question}</p>
        <div className={styles['wrapper-link']}>
          <Link to={path} className={styles.link}>
            {textLink}
          </Link>
          <svg className={styles.arrow}>
            <use href='#arrow-auth' />
          </svg>
        </div>
      </div>
    </div>
  );
};
