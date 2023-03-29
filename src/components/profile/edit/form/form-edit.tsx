import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../../../store/hooks/use-typed-selector';
import {
  getFirstNameSelector,
  getLastNameSelector,
  getLoginSelector,
  getMailSelector,
  getPhoneSelector,
  userIdSelector,
} from '../../../../store/selectors/selectors';
import { FormEditFielfs } from '../../../../types/enum';
import { IFormEditSubmit } from '../../../../types/interface/interface';
import { DEFAULT_PASSWORD } from '../../../../utils/constants/constants';
import {
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_FIRST_NAME,
  PLACEHOLDER_LAST_NAME,
  PLACEHOLDER_LOGIN,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PHONE,
} from '../../../../utils/constants/input-text';
import { BUTTON_EDIT, BUTTON_EDIT_SAVE } from '../../../../utils/constants/text-button';
import { rulesPattern } from '../../../../utils/constants/validation';
import { convertDataForm, getRequsetUpdateUserData } from '../../../../utils/helpers';
import { ButtonForm } from '../../components/button/button-form';
import { InputForm } from '../../components/input/input-form';
import { InputPassword } from '../../components/input/input-password';
import { InputPhone } from '../../components/input/input-phone';
import { InputUserName } from '../../components/input/input-username';

import styles from './form.module.css';

export const FormEdit = () => {
  const dispatch = useDispatch();
  const [stateDisabled, toggleStateDisabled] = useState(true);
  const toogleDisabled = () => toggleStateDisabled(!stateDisabled);
  const firstName = useTypedSelector(getFirstNameSelector);
  const lastName = useTypedSelector(getLastNameSelector);
  const login = useTypedSelector(getLoginSelector);
  const phone = useTypedSelector(getPhoneSelector);
  const email = useTypedSelector(getMailSelector);
  const userId = useTypedSelector(userIdSelector);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      email,
      login,
      password: '',
      firstName,
      lastName,
      phone,
    },
  });

  useEffect(() => {
    setValue('login', login);
    setValue('lastName', lastName);
    setValue('firstName', firstName);
    setValue('phone', phone);
    setValue('email', email);
    setValue('password', DEFAULT_PASSWORD)
  }, [setValue, login, lastName, firstName, phone, email]);

  const onSubmit = (data: IFormEditSubmit) => {
    const objectResponse = convertDataForm(data);
    getRequsetUpdateUserData(objectResponse, userId, dispatch);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='profile-form'>
      <section className={styles.container}>
        <article className={styles['wrap-input']}>
          <InputUserName
            placeholder={PLACEHOLDER_LOGIN}
            type='text'
            disable={stateDisabled}
            values={login}
            register={register}
            rules={rulesPattern.username}
            nameFeild={FormEditFielfs.LOGIN}
            errors={errors.login}
          />
          <InputPassword
            placeholder={PLACEHOLDER_PASSWORD}
            type='password'
            disable={stateDisabled}
            register={register}
            rules={rulesPattern.password}
            nameFeild={FormEditFielfs.PASSWORD}
            errors={errors.password}
            dirtyFields={dirtyFields.password}
          />
        </article>
        <article className={styles['wrap-input']}>
          <InputForm
            placeholder={PLACEHOLDER_FIRST_NAME}
            type='text'
            disable={stateDisabled}
            values={firstName}
            rules={rulesPattern.firstName}
            register={register}
            nameFeild={FormEditFielfs.FIRSTNAME}
            errors={errors.firstName}
          />
          <InputForm
            placeholder={PLACEHOLDER_LAST_NAME}
            type='text'
            disable={stateDisabled}
            values={lastName}
            rules={rulesPattern.firstName}
            register={register}
            nameFeild={FormEditFielfs.LASTNAME}
            errors={errors.lastName}
          />
        </article>
        <article className={styles['wrap-input']}>
          <InputPhone
            placeholder={PLACEHOLDER_PHONE}
            type='phone'
            disable={stateDisabled}
            values={phone}
            rules={rulesPattern.phone}
            register={register}
            nameFeild={FormEditFielfs.PHONE}
            errors={errors.phone}
            control={control}
          />
          <InputForm
            placeholder={PLACEHOLDER_EMAIL}
            type='mail'
            disable={stateDisabled}
            values={email}
            rules={rulesPattern.email}
            register={register}
            nameFeild={FormEditFielfs.EMAIL}
            errors={errors.email}
          />
        </article>
      </section>
      <section className={styles['button-wrap']}>
        <ButtonForm text={BUTTON_EDIT} types={false} disable={false} func={toogleDisabled} data='edit-button' />
        <ButtonForm text={BUTTON_EDIT_SAVE} types={true} disable={stateDisabled} func={() => {}} data='save-button' />
      </section>
    </form>
  );
};
