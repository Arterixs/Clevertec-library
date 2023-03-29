import { useLocation } from 'react-router-dom';

import { FormMailForgot } from './components/form-mail-forgot';
import { FormPassForgot } from './components/form-pass-forgot';

export const PassForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const getTokenCode = queryParams.get('code');

  return getTokenCode ? <FormPassForgot code={getTokenCode} /> : <FormMailForgot />;
};
