import { CLASSNAME_STAR_WINDOW } from '../../utils/constants/constants';
import { convertingStarGrade } from '../../utils/helpers';

import { Star } from './grades/star';

export const Ratio = (props: { rating: number }) => {
  const arrayStars = convertingStarGrade(props.rating);

  return (
    <section className='ratio-block'>
      <h3 className='ratio-block__ratio'>Рейтинг</h3>
      <div className='stars-block'>
        {arrayStars.map((item) => (
          <Star key={item.id} dataTestId={item.dataTestId} href={item.href} className={CLASSNAME_STAR_WINDOW} />
        ))}
        <p className='ratio-full'>{props.rating}</p>
      </div>
    </section>
  );
};
