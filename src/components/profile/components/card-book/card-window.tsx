import { Link } from 'react-router-dom';

import empty from '../../../../assets/image/webp/fon-empty.webp';
import { IBookUser } from '../../../../types/interface/response';
import { CLASSNAME_STAR_WINDOW } from '../../../../utils/constants/constants';
import { URL_IMAGE } from '../../../../utils/constants/path-url';
import { checkedAuthors, convertingStarGrade } from '../../../../utils/helpers';
import { Star } from '../../../book-page/grades/star';

import styles from './card-window.module.css';

export const CardWindow = ({ book, children }: { book: IBookUser | null | undefined; children: JSX.Element }) => {
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
        <section className={styles['content-wrap']}>
          <div className={styles['grade-container']}>
            {arrayStars.map((item) => (
              <Star key={item.id} dataTestId={item.dataTestId} href={item.href} className={CLASSNAME_STAR_WINDOW} />
            ))}
          </div>
          <section className={styles['wrap-title']}>
            <h2 className={styles.title}>{book?.title}</h2>
            <section className={styles['wrap-authors']}>
              {arrayAuthors.map((item) => (
                <p className={styles.authors} key={item.length}>
                  {item}
                </p>
              ))}
            </section>
          </section>
        </section>
        {children}
      </Link>
    </article>
  );
};
