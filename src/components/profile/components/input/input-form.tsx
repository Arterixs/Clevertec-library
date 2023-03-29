import { IInputProps } from '../../../../types/interface/interface';

import styles from './input-form.module.css';

export const InputForm = ({ placeholder, type, disable, nameFeild, register, rules, errors }: IInputProps) => (
  <div className={styles.container}>
    <input
      className={errors?.types ? `${styles.input} ${styles.error}` : styles.input}
      type={type}
      disabled={disable}
      {...register(nameFeild, { ...rules })}
    />
    <p className={styles.placeholder}>{placeholder}</p>
    {errors?.types?.pattern && (
      <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
        Введите корректный e-mail
      </p>
    )}
    {errors?.types?.required && (
      <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
        {errors.message}
      </p>
    )}
  </div>
);
