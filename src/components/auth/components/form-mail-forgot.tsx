import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { requestSendLetterChangePassword } from '../../../http/send-letter-change-password';
import { actionLoadedResponse } from '../../../store/actions/action-creaters';
import { IFormForgotMail } from '../../../types/interface/interface';
import { PATH_REG } from '../../../utils/constants/path-url';
import { CONTENT_REQUEST_RESTORE, REG_ERROR, TITLE_REQUEST_RESTORE } from '../../../utils/constants/response-request';
import {
  BUTTON_RECOVER,
  LINK_QUESTION_AUTH,
  LINK_REGISTRATION_AUTH,
  PLACEHOLDER_RECOVER_MAIL,
  TITLE_RECOVER,
} from '../../../utils/constants/text';
import { FormRequestRestore } from '../form-response/form-restore';
import { HeaderForgot } from '../header/header-forgot';
import { InputForgotMail } from '../input/input-mail-forgot';
import { RegisterAuth } from '../register-link/register-auth';

import styles from '../pass.module.css';

export const FormMailForgot = () => {
  const dispatch = useDispatch();
  const [focusMail, setFocusMail] = useState(false);
  const toggleFocusMail = () => setFocusMail(!focusMail);
  const [stateRequest, setStateRequest] = useState(2);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: IFormForgotMail) => {
    dispatch(actionLoadedResponse(true));
    const getResponse = await requestSendLetterChangePassword(data);

    setStateRequest(getResponse);
    dispatch(actionLoadedResponse(false));
  };

  return (
    <div style={{ width: '100%' }}>
      {stateRequest ? (
        <form data-test-id='send-email-form' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <HeaderForgot />
          <div className={styles.wrapper}>
            <h2 className={styles.title}>{TITLE_RECOVER}</h2>
            <div className={styles['wrapper-input']}>
              <InputForgotMail reg={register} error={errors} func={toggleFocusMail} />
              {(errors.email || !focusMail) && (
                <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                  {errors.email?.message}
                </p>
              )}
              {stateRequest === REG_ERROR && (
                <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                  error
                </p>
              )}
              <p className={styles.helps}>{PLACEHOLDER_RECOVER_MAIL}</p>
            </div>
            <RegisterAuth
              textButton={BUTTON_RECOVER}
              path={PATH_REG}
              question={LINK_QUESTION_AUTH}
              textLink={LINK_REGISTRATION_AUTH}
            />
          </div>
        </form>
      ) : (
        <FormRequestRestore title={TITLE_REQUEST_RESTORE} text={CONTENT_REQUEST_RESTORE} />
      )}
    </div>
  );
};
