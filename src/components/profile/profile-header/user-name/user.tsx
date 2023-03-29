import { useTypedSelector } from '../../../../store/hooks/use-typed-selector';
import { getFirstNameSelector, getLastNameSelector } from '../../../../store/selectors/selectors';

import styles from './user.module.css';

export const UserName = () => {
  const userFirstName = useTypedSelector(getFirstNameSelector);
  const userLastName = useTypedSelector(getLastNameSelector);

  return (
    <div className={styles.wrapper}>
      <p className={styles.size}>{userFirstName}</p>
      <p className={styles.size}>{userLastName}</p>
    </div>
  );
};
