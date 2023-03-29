import { IInputAuth } from '../../../types/interface/interface';
import styles from './input-form.module.css';

export const InputAuth = (props: IInputAuth) => {
  const { placeholder, name, reg, type, error, state, toggle } = props;
  const isError = Object.keys(error).includes(name);

  return (
    <>
      <input
        className={isError || !state ? `${styles.input} ${styles.error}` : styles.input}
        type={type}
        placeholder=' '
        onFocus={toggle}
        {...reg(name, { required: { value: true, message: 'Поле не может быть пустым' }, onBlur: toggle })}
        autoComplete='off'
      />
      <label className={styles.placeholder}>{placeholder}</label>
    </>
  );
};
