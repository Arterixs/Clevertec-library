import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { LoaderTwo } from '../../components/loaded/loader-two';
import { SpriteAuth } from '../../components/sprite-auth';
import { actionAuth } from '../../store/actions/action-creaters';
import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { authSelector } from '../../store/selectors/selectors';

import styles from './auth.module.css';

export const AuthPage = () => {
  const dispatch = useDispatch();
  const isToken = localStorage.getItem('token');
  const auth = useTypedSelector(authSelector);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/books/all';

  useEffect(() => {
    if (isToken && !auth) {
      dispatch(actionAuth(true));
    }
  }, [dispatch, isToken, auth]);

  if (auth) {
    if (fromPage === '/') {
      return <Navigate to='/books/all' />;
    }

    return <Navigate to={fromPage} />;
  }

  return (
    <div data-test-id='auth' className={styles.wrapper}>
      <LoaderTwo />
      <SpriteAuth />
      <div className={styles['wrapper-two']}>
        <div className={styles.container}>
          <h1 className={styles.title}>Cleverland</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
