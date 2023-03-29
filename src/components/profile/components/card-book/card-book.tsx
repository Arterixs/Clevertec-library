import { Link } from 'react-router-dom';

import empty from '../../../../assets/image/webp/fon-empty.webp';
import { IBookUser } from '../../../../types/interface/response';
import { CLASSNAME_STAR_LIST } from '../../../../utils/constants/constants';
import { URL_IMAGE } from '../../../../utils/constants/path-url';
import { checkedAuthors, convertingStarGrade } from '../../../../utils/helpers';
import { Star } from '../../../book-page/grades/star';

import styles from './card-book.module.css';

export const CardBook = ({ book, children }: { book: IBookUser | null | undefined; children: JSX.Element }) => {
  const arrayAuthors = checkedAuthors(book?.authors);
  const arrayStars = convertingStarGrade(book?.rating);

  return (
    <article data-test-id='card'>
      <Link to={`/books/all/${book?.id}`} className={styles.card}>
        {book?.image ? (
          <img className={styles.image} src={`${URL_IMAGE}${book?.image}`} alt='cover' />
        ) : (
          <div className={styles.empty} style={{ backgroundImage: `url(${empty})` }}>
            <svg className={styles.cat}>
              <use href='#cat' />
            </svg>
          </div>
        )}
        <div className={styles.content}>
          <section className={styles['block-name']}>
            <h2 className={styles.title}>{book?.title}</h2>
          </section>
          <section className={styles['block-authors']}>
            {arrayAuthors.map((item) => (
              <p className={styles.authors} key={item.length}>
                {item}
              </p>
            ))}
          </section>
          <div className={styles['block-grades']}>
            <div className={styles['star-container']}>
              {arrayStars.map((item) => (
                <Star key={item.id} dataTestId={item.dataTestId} href={item.href} className={CLASSNAME_STAR_LIST} />
              ))}
            </div>
            {children}
          </div>
        </div>
      </Link>
    </article>
  );
};
