import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { actionCloseOpen } from '../../store/actions/action-creaters';
import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import {
  responseBookingErrorSelector,
  responseErrorSelector,
  responseLoadedSelector,
  responseOpenWindowSelector,
  responseTextWindowSelector,
} from '../../store/selectors/selectors';

import styles from './wind-mess.module.css';

export const WindowMessage = () => {
  const dispatch = useDispatch();
  const isLoading = useTypedSelector(responseLoadedSelector);
  const isError = useTypedSelector(responseErrorSelector);
  const isBookingError = useTypedSelector(responseBookingErrorSelector);
  const isOpen = useTypedSelector(responseOpenWindowSelector);
  const text = useTypedSelector(responseTextWindowSelector);
  const closeWindow = () => dispatch(actionCloseOpen(false));

  const styleWindow =
    isError || isBookingError
      ? `${styles.window} ${styles['window-error']}`
      : `${styles.window} ${styles['window-succes']}`;

  useEffect(() => {
    if (isOpen && !isLoading) {
      const autoCloseWindow = setTimeout(() => {
        dispatch(actionCloseOpen(false));
      }, 4000);

      return () => clearTimeout(autoCloseWindow);
    }

    return () => {};
  }, [isOpen, isLoading, dispatch]);

  return (
    <div className={styleWindow} data-test-id='error'>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <svg className={styles.svg}>
            <use href={isError || isBookingError ? '#error' : '#succes'} />
          </svg>
          <p className={styles.text}>{text}</p>
        </div>
        <button type='button' className={styles.button} onClick={closeWindow} data-test-id='alert-close'>
          <span className={styles['span-left']} />
          <span className={styles['span-right']} />
        </button>
      </div>
    </div>
  );
};
