import { Link } from 'react-router-dom';

import { IPropsResponseForm } from '../../../types/interface/interface';

import styles from './form-response.module.css';

export const FormResponse = (props: IPropsResponseForm) => {
  const { title, text, textButton, path, func } = props;

  return (
    <div className={styles.wrapper} data-test-id='status-block'>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      <Link to={path}>
        <button className={styles.button} type='button' onClick={func}>
          <span>{textButton}</span>
        </button>
      </Link>
    </div>
  );
};
