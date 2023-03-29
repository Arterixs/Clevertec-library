import { Control,Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import { IFormEditSubmit, IInputProps } from '../../../../types/interface/interface';
import { MASK_PHONE } from '../../../../utils/constants/validation';

import styles from './input-form.module.css';

export const InputPhone = ({
  placeholder,
  type,
  disable,
  register,
  control,
  nameFeild,
  rules,
  errors,
}: IInputProps & { control: Control<IFormEditSubmit, any> }) => (
  <div className={styles.container}>
    <Controller
      name={nameFeild}
      {...register}
      control={control}
      rules={{ ...rules }}
      render={({ field: { onChange, onBlur, value, ref, name } }) => (
        <MaskedInput
          className={errors?.types ? `${styles.input} ${styles.error}` : styles.input}
          type={type}
          name={name}
          disabled={disable}
          defaultValue={value}
          onBlur={onBlur}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=' '
          ref={ref}
          mask={MASK_PHONE}
          guide={true}
          keepCharPositions={true}
          placeholderChar={'\u0078'}
          showMask={true}
        />
      )}
    />
    <p className={styles.placeholder}>{placeholder}</p>
    {errors?.types?.required && (
      <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
        {errors.message}
      </p>
    )}
    {errors?.types?.pattern && (
      <p data-test-id='hint' className={`${styles.helps} ${styles['helps-error']}`}>
        В формате +375 (xx) xxx-xx-xx
      </p>
    )}
  </div>
);
