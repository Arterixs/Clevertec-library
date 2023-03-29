import { CLASSNAME_STAR_WINDOW } from '../../utils/constants/constants';
import { convertingStarGrade } from '../../utils/helpers';

import { Star } from './grades/star';

export const RatioEmpty = (props: { rating: number | null }) => {
  const arrayStars = convertingStarGrade(props.rating);

  return (
    <section className='ratio-block'>
      <h3 className='ratio-block__ratio'>Рейтинг</h3>
      <div className='stars-block-empty'>
        {arrayStars.map((item) => (
          <Star key={item.id} dataTestId={item.dataTestId} href={item.href} className={CLASSNAME_STAR_WINDOW} />
        ))}
        <p className='ratio-none'>Оценок ещё нет</p>
      </div>
    </section>
  );
};
