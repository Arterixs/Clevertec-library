import { useEffect, useState } from 'react';

import { IAmountStars } from '../../../../types/interface/interface';
import { getStars } from '../../../../utils/helper';

import styles from './grade-container.module.css';

export const GradeContainer = (props: { callback: (amount: number) => void; stars?: number }) => {
  const [stateGrade, setStateGrade] = useState<IAmountStars[]>(getStars(5));
  const clikedRating = (amount: number) => {
    setStateGrade(getStars(amount));
    props.callback(amount);
  };

  useEffect(() => {
    if (props.stars) {
      setStateGrade(getStars(props.stars));
    }
  }, [props.stars]);

  return (
    <div className={styles.container} data-test-id='rating'>
      {stateGrade.map((item) => (
        <button type='button' className={styles.button} key={item.id} onClick={() => clikedRating(item.id)}>
          {item.element}
        </button>
      ))}
    </div>
  );
};
