import { Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import { IInputForm } from '../../../types/interface/interface';
import { MASK_PHONE } from '../../../utils/constants/validation';
import { getNameFormReg } from '../../../utils/helpers';

import styles from './input-form.module.css';

export const InputForm = (props: IInputForm) => {
  const { type, placeholder, reg, name, rules, error, control } = props;
  const named = getNameFormReg(name);
  const isError = Object.keys(error).includes(name);
  const isPhone = named === 'phone';

  return (
    <>
      {isPhone ? (
        <Controller
          name={named}
          control={control}
          rules={{ ...rules }}
          render={({ field: { onChange, onBlur } }) => (
            <MaskedInput
              className={isError ? `${styles.input} ${styles.error}` : styles.input}
              type={type}
              name={named}
              placeholder=' '
              onFocus={props.toggleFocus}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
              mask={MASK_PHONE}
              guide={true}
              keepCharPositions={true}
              placeholderChar={'\u0078'}
              showMask={false}
            />
          )}
        />
      ) : (
        <input
          className={isError ? `${styles.input} ${styles.error}` : styles.input}
          type={type}
          placeholder=' '
          required={true}
          {...reg(named, { ...rules, onBlur: props.toggleFocus })}
          autoComplete='off'
        />
      )}
      <label className={styles.placeholder}>{placeholder}</label>
    </>
  );
};
