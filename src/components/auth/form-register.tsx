import { useState } from 'react';
import { MultipleFieldErrors, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { requestRegistration } from '../../http/registration';
import { actionLoadedResponse } from '../../store/actions/action-creaters';
import { IFormRegSubmit } from '../../types/interface/interface';
import { dataResetForms } from '../../utils/constants/other';
import { PATH_AUTHORIZATION } from '../../utils/constants/path-url';
import { LINK_AUTH, LINK_QUESTION_REG, TITLE_REGISTRATION } from '../../utils/constants/text';
import { switchStep } from '../../utils/constants/validation';
import { getTypeInput, getValidObj } from '../../utils/helpers';

import { Check } from './check-mark/check';
import { Eye } from './eye/eye';
import { FormResponse } from './form-response/form-response';
import { InputForm } from './input/input-form';
import { RegisterLink } from './register-link/register-link';

import styles from './register.module.css';

export const validPassword = (errors: MultipleFieldErrors | undefined, focus: boolean) => {
  const obj = Object.keys(getValidObj(errors)).length;

  if (obj && focus) {
    return (
      <p data-test-id='hint' className={errors?.required ? styles.helps : `${styles.helps} ${styles['helps-error']}`}>
        Пароль <span>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span>цифрой</span>
      </p>
    );
  }

  return (
    <p data-test-id='hint' className={styles.helps}>
      Пароль
      <span className={errors?.minLength && styles['helps-error']}> не менее 8 символов</span>, с
      <span className={errors?.isLetter && styles['helps-error']}> заглавной буквой </span>и
      <span className={errors?.isNumber && styles['helps-error']}> цифрой</span>
    </p>
  );
};

export const validUserName = (errors: MultipleFieldErrors | undefined, focus: boolean) => {
  const obj = Object.keys(getValidObj(errors)).length;
    if (obj && focus) {
      return (
        <p data-test-id='hint' className={errors?.required ? styles.helps : `${styles.helps} ${styles['helps-error']}`}>
          Используйте для логина <span>латинский алфавит</span> и <span>цифры</span>
        </p>
      );
    }

  return (
    <p data-test-id='hint' className={styles.helps}>
      Используйте для логина
      <span className={errors?.isLetter && styles['helps-error']}> латинский алфавит </span>и
      <span className={errors?.isNumber && styles['helps-error']}> цифры </span>
    </p>
  );
};

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [eye, setEye] = useState(false);
  const updateStep = () => (step === 3 ? setStep(1) : setStep(step + 1));
  const [focusPassword, setFocusPassword] = useState(true);
  const [focusLogin, setFocusLogin] = useState(true);
  const [isResponse, setResponse] = useState(false);
  const [countData, setCountData] = useState(0);
  const toggleFocusPassword = () => setFocusPassword(!focusPassword);
  const toggleFocusLogin = () => setFocusLogin(!focusLogin);
  const toggleEye = () => setEye(!eye);
  const metaForm = switchStep(step);
  const {
    typeInputUp,
    typeInputDown,
    placeholderInputUp,
    placeholderInputDown,
    helpsInputUp,
    textButton,
    requaredNameDown,
    requaredNameUp,
    rulesUp,
    rulesDown,
  } = metaForm;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
  });
  const typeInput = step === 1 ? getTypeInput(eye) : typeInputDown;

  const onSubmit = async (data: IFormRegSubmit) => {
    dispatch(actionLoadedResponse(true));
    const getResponse = await requestRegistration(data);

    setCountData(getResponse);
    setResponse(true);
    dispatch(actionLoadedResponse(false));
  };

  const resetStateForm = () => {
    reset();
    updateStep();
    setFocusPassword(true);
    setFocusLogin(true);
    setEye(false);
    setResponse(false);
  };

  const clickButton = () => updateStep();
  const clickButtonResponse = () => resetStateForm();

  return (
    <div style={{ width: '100%' }}>
      {isResponse ? (
        <FormResponse
          {...dataResetForms[countData]}
          func={countData === 1 ? handleSubmit(onSubmit) : clickButtonResponse}
        />
      ) : (
        <form data-test-id='register-form' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['wrapper-title']}>
            <h2 className={styles.title}>{TITLE_REGISTRATION}</h2>
            <p className={styles.subtitle}>{step} шаг из 3</p>
          </div>
          <div className={styles['input-group-reg']}>
            <div className={styles['wrapper-input']}>
              <InputForm
                type={typeInputUp}
                placeholder={placeholderInputUp}
                reg={register}
                name={requaredNameUp}
                rules={rulesUp}
                error={errors}
                toggleFocus={toggleFocusLogin}
                control={control}
              />
              {step === 1 && errors.username?.types?.required && (
                <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                  {errors.username.message}
                </p>
              )}
              {step === 1 && validUserName(errors.username?.types, focusLogin)}
              {step === 2 && (
                <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                  {errors.firstName?.message}
                </p>
              )}
              {step === 3 && (
                <p
                  data-test-id='hint'
                  className={errors.phone ? `${styles.helps} ${styles['helps-error']}` : styles.helps}
                >
                  {errors.phone?.message ? errors.phone?.message : helpsInputUp}
                </p>
              )}
            </div>
            <div className={styles['wrapper-input']}>
              <InputForm
                type={typeInput}
                placeholder={placeholderInputDown}
                reg={register}
                name={requaredNameDown}
                rules={rulesDown}
                error={errors}
                toggleFocus={toggleFocusPassword}
              />
              {step === 1 && dirtyFields.password ? <Eye func={toggleEye} flag={eye} /> : null}
              {step === 1 && dirtyFields.password && !errors.password ? <Check /> : null}
              {step === 1 && errors.password?.types?.required && (
                <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                  Поле не может быть пустым
                </p>
              )}
              {step === 1 && validPassword(errors.password?.types, focusPassword)}
              {step === 2 && (
                <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                  {errors.lastName?.message}
                </p>
              )}
              {step === 3 && (
                <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>
          <RegisterLink
            func={step === 3 ? () => {} : clickButton}
            textButton={textButton.toUpperCase()}
            path={PATH_AUTHORIZATION}
            question={LINK_QUESTION_REG}
            textLink={LINK_AUTH}
            valid={isValid}
          />
        </form>
      )}
    </div>
  );
};
