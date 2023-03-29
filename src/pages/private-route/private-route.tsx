import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { actionAuth } from '../../store/actions/action-creaters';
import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { authSelector } from '../../store/selectors/selectors';
import { PATH_AUTHORIZATION } from '../../utils/constants/path-url';
import { firstRequestGetUser } from '../../utils/helpers';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const auth = useTypedSelector(authSelector);
  const isToken = localStorage.getItem('token');
  const location = useLocation();
  const didLogRef = useRef(false)

  useEffect(() => {
    if (isToken && !auth) {
      if (!didLogRef.current)
        dispatch(actionAuth(true));
        firstRequestGetUser(dispatch);
      didLogRef.current = true
    }
  }, [dispatch, isToken, auth]);

  return auth ? children : <Navigate to={PATH_AUTHORIZATION} state={{ from: location }} />;
};
