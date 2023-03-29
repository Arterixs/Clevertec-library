import { useRef, useState } from 'react';
import { FreeMode, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Slider = (props: { image: string[] }) => {
  const coverArray = props.image;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const swiperRef = useRef<any | null>(null);

  if (swiperRef.current) {
    swiperRef.current.onmouseenter = () => {
      swiperRef.current.lastChild.classList.add('swiper-scrollbar-horizontal_hover');
    };

    swiperRef.current.onmouseleave = () => {
      swiperRef.current.lastChild.classList.remove('swiper-scrollbar-horizontal_hover');
    };
  }

  return (
    <>
      <Swiper
        data-test-id='slide-big'
        spaceBetween={30}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs, Pagination]}
        className='mySwiperUp'
        pagination={{
          clickable: true,
          type: 'bullets',
        }}
      >
        {coverArray.map((item) => (
          <SwiperSlide key={Date.now() + item.length * Math.random()}>
            <img src={`${item}`} alt='cover-books' className='head-book-page__image head-book-page__image_swiper' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[FreeMode, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView={5}
        freeMode={true}
        breakpoints={{
          320: {
            scrollbar: {
              horizontalClass: 'scrollBar_hidden',
            },
          },
          769: {
            scrollbar: {
              draggable: true,
              dragSize: 190,
            },
          },
        }}
        scrollbar={{
          draggable: true,
          dragSize: 190,
        }}
        ref={swiperRef}
        centeredSlides={true}
        watchSlidesProgress={true}
        centerInsufficientSlides={true}
        centeredSlidesBounds={true}
        onSwiper={setThumbsSwiper}
        className='mySwiperDown'
      >
        {coverArray.map((item) => (
          <SwiperSlide key={Date.now() + item.length * Math.random()} data-test-id='slide-mini'>
            <img src={`${item}`} alt='cover-books' className='slider-books-cover' />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
