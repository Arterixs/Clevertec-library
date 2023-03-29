import { PropsMetaData } from '../../types/types';

export const MetaInfo = (props: PropsMetaData) => {
  const { issueYear, publish, pages, cover, weight, format, ISBN, producer, categories } = props;
  const getCategory = Array.isArray(categories) ? categories[0] : '';

  return (
    <section className='body-meta-info'>
      <section className='meta-info-title-block'>
        <h3 className='ratio-block__ratio'>Подробная информация</h3>
      </section>
      <section className='meta-info-content'>
        <div className='content-one'>
          <ul className='content__list-one'>
            <li className='content__list-item'>Издательство</li>
            <li className='content__list-item'>Год издания</li>
            <li className='content__list-item'>Страниц</li>
            <li className='content__list-item'>Переплёт</li>
            <li className='content__list-item'>Формат</li>
          </ul>
          <ul className='content__list-two'>
            <li className='content__list-item-two'>{publish}</li>
            <li className='content__list-item-two'>{issueYear}</li>
            <li className='content__list-item-two'>{pages}</li>
            <li className='content__list-item-two'>{cover}</li>
            <li className='content__list-item-two'>{format}</li>
          </ul>
        </div>
        <div className='content-two'>
          <ul className='content__list-one'>
            <li className='content__list-item'>Жанр</li>
            <li className='content__list-item'>Вес</li>
            <li className='content__list-item'>ISBN</li>
            <li className='content__list-item'>Изготовитель</li>
          </ul>
          <ul className='content__list-two content__list-two_size'>
            <li className='content__list-item-two'>{getCategory}</li>
            <li className='content__list-item-two'>{weight}</li>
            <li className='content__list-item-two'>{ISBN}</li>
            <li className='content__list-item-two'>{producer}</li>
          </ul>
        </div>
      </section>
    </section>
  );
};
