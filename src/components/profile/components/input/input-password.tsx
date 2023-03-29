import { useState } from 'react';

import { IInputProps } from '../../../../types/interface/interface';
import { Eye } from '../../../auth/eye/eye';
import { validPassword } from '../../../auth/form-register';

import styles from './input-form.module.css';

export const InputPassword = ({
  placeholder,
  type,
  disable,
  nameFeild,
  register,
  rules,
  errors,
  dirtyFields,
}: IInputProps) => {
  const [eye, toggleEye] = useState(false);
  const openEye = () => toggleEye(!eye);

  return (
    <div className={styles.container}>
      <input
        className={errors ? `${styles.input} ${styles.error}` : styles.input}
        type={eye ? 'text' : type}
        disabled={disable}
        {...register(nameFeild, { ...rules })}
      />
      <p className={styles.placeholder}>{placeholder}</p>
      {errors?.types?.required && (
        <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
          {errors.message}
        </p>
      )}
      {errors?.types && !errors.message && validPassword(errors?.types, true)}
      {dirtyFields && <Eye flag={eye} func={openEye} />}
    </div>
  );
};
