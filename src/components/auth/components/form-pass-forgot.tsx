import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { requestChangePassword } from '../../../http/change-password';
import { actionLoadedResponse } from '../../../store/actions/action-creaters';
import { IFormRestoreSubmit } from '../../../types/interface/interface';
import { dataResetPassword } from '../../../utils/constants/other';
import { ERROR_COINCEDENSE_PASSWORD, TEXT_REGISTER_RESTORE, TITLE_RECOVER } from '../../../utils/constants/text';
import { TEXT_BUTTON_FORGOT_PASS } from '../../../utils/constants/text-button';
import { switchStep } from '../../../utils/constants/validation';
import { Check } from '../check-mark/check';
import { Eye } from '../eye/eye';
import { validPassword } from '../form-register';
import { FormResponse } from '../form-response/form-response';
import { InputForgotPass } from '../input/input-forgot-pass';
import { RegisterRestore } from '../register-link/register-restore';

import styles from '../pass.module.css';

export const FormPassForgot = (props: { code: string }) => {
  const dispatch = useDispatch();
  const [isResponse, setResponse] = useState(false);
  const [countData, setCountData] = useState(0);
  const [eyeUp, setEyeUp] = useState(false);
  const [eyeDown, setEyeDown] = useState(false);
  const [focusPassword, setFocusPassword] = useState(true);
  const [focusPasswordCon, setFocusPasswordCon] = useState(false);
  const [blur, setBlur] = useState(true)
  const toggleFocusPassword = () => setFocusPassword(!focusPassword);
  const toggleEyeUp = () => setEyeUp(!eyeUp);
  const toggleEyeDown = () => setEyeDown(!eyeDown);
  const onFocus = () => {
    setBlur(false)
    setFocusPasswordCon(true)
  }
  const onBlur = () => {
    setBlur(true)
    setFocusPasswordCon(false)
  }
  const dateValidation = switchStep(1);
  const { rulesDown } = dateValidation;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    clearErrors,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
      code: props.code,
    },
  });

  const toggleFocusPasswordCon = () => {
      clearErrors('passwordConfirmation');
  };

  const validationRepeatPassword = {
    required: {
      value: true,
      message: 'Поле не может быть пустым',
    },
    validate: {
      isCoinsedense: (value: string) => watch('password') === value,
    },
  };

  const onSubmit = async (data: IFormRestoreSubmit) => {
    dispatch(actionLoadedResponse(true));
    const getResponse = await requestChangePassword(data);

    setCountData(getResponse);
    setResponse(true);
    dispatch(actionLoadedResponse(false));
  };
  const clickButtonResponse = () => reset();
  const onChangePassword = () => trigger('password');
  return (
    <div style={{ width: '100%' }}>
      {isResponse ? (
        <FormResponse
          {...dataResetPassword[countData]}
          func={countData === 1 ? handleSubmit(onSubmit) : clickButtonResponse}
        />
      ) : (
        <form data-test-id='reset-password-form' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.wrapper} ${styles['wrapper-pad']}`}>
            <h2 className={styles.title}>{TITLE_RECOVER}</h2>
            <div className={styles['wrapper-input']}>
              <InputForgotPass
                placeholder='Новый пароль'
                reg={register}
                name='password'
                rules={rulesDown}
                error={errors}
                toggleFocus={toggleFocusPassword}
                stateType={eyeUp}
                onChange={onChangePassword}
              />
              <Eye func={toggleEyeUp} flag={eyeUp} />
              {dirtyFields.password && !errors.password ? <Check /> : null}
              {(errors.password?.types?.required || focusPassword) && (
                <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                  {errors.password?.message}
                </p>
              )}
              {validPassword(errors.password?.types, focusPassword)}
            </div>
            <div className={styles['wrapper-input']}>
              <InputForgotPass
                placeholder='Повторите пароль'
                reg={register}
                name='passwordConfirmation'
                rules={validationRepeatPassword}
                error={errors}
                stateType={eyeDown}
                toggleFocus={onBlur}
                onBlur={blur}
                onFocus={onFocus}
                onChange={toggleFocusPasswordCon}
              />
              <Eye func={toggleEyeDown} flag={eyeDown} />
              {errors.passwordConfirmation?.types?.required &&
              <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                {errors.passwordConfirmation.message}
              </p>
              }
              {errors.passwordConfirmation?.types && blur && (
                <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                  {errors.passwordConfirmation?.types?.required
                    ? null
                    : ERROR_COINCEDENSE_PASSWORD}
                </p>
              )}
            </div>
            <RegisterRestore
              textButton={TEXT_BUTTON_FORGOT_PASS}
              question={TEXT_REGISTER_RESTORE}
              disabled={errors.passwordConfirmation?.types ? true : false}
            />
          </div>
        </form>
      )}
    </div>
  );
};
