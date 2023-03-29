import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { responseLoadedSelector } from '../../store/selectors/selectors';

import styles from './loader-two.module.css';

export const LoaderTwo = () => {
  const isLoader = useTypedSelector(responseLoadedSelector);

  return (
    <div className={isLoader ? styles.wrapper : `${styles.wrapper} ${styles.hidden}`} data-test-id='loader'>
      <div className={isLoader ? styles.preloader : `${styles.preloader} ${styles.stop}`} />
    </div>
  );
};
