import emptyImage from '../../assets/image/webp/fon-empty.webp';

export const CoverEmpty = () => (
  <div className='wrapper-img-books'>
    <div className='wrapper-cover-empty'>
      <img src={`${emptyImage}`} alt='cover-books' className='head-book-page__image' />
      <svg className='book__cats-empty-cover'>
        <use href='#cat' />
      </svg>
    </div>
  </div>
);
