import { ISwiperData } from '../../types/interface/interface';
import { Slider } from '../swiper/swiper';

export const CoverBook = (props: ISwiperData) => {
  const { amountSliderCovers, amountBooksCover } = props;

  return (
    <div className='wrapper-img-books'>
      {amountSliderCovers > 1 ? (
        <Slider image={amountBooksCover} key={1} />
      ) : (
        <img src={`${amountBooksCover[0]}`} alt='cover-books' className='head-book-page__image' />
      )}
    </div>
  );
};
