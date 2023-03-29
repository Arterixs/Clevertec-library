import { IInputForgot } from '../../../types/interface/interface';
import styles from './input-form.module.css';

export const InputForgotPass = (props: IInputForgot) => {
  const { placeholder, name, reg, error, rules, stateType, toggleFocus, onBlur, onFocus } = props;
  const isError = Object.keys(error).includes(name);
  return (
    <>
      <input
        className={isError && onBlur ? `${styles.input} ${styles.error}` : styles.input}
        type={stateType ? 'text' : 'password'}
        placeholder=' '
        onFocus={name=== 'passwordConfirmation' ? onFocus : () => {}}
        {...reg(name, { ...rules, onBlur: toggleFocus, onChange: props.onChange })}
        autoComplete='off'
      />
      <label className={styles.placeholder}>{placeholder}</label>
    </>
  );
};
