import empty from '../../assets/image/webp/fon-empty.webp';

export const EmptyCard = () => (
  <div className='book__image' style={{ backgroundImage: `url(${empty})` }}>
    <svg className='book__cats'>
      <use href='#cat' />
    </svg>
  </div>
);
