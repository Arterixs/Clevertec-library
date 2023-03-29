import avaComment from '../../assets/image/webp/ava-rev.webp';
import { ICommentsMeta } from '../../types/interface/response';
import { CLASSNAME_STAR_WINDOW } from '../../utils/constants/constants';
import { convertedDate, convertingStarGrade } from '../../utils/helpers';

import { Star } from './grades/star';

export const Comment = (props: ICommentsMeta) => {
  const { text, createdAt, user, rating } = props;
  const date = convertedDate(createdAt);
  const arrayStars = convertingStarGrade(rating);

  return (
    <article className='card-comment' data-test-id='comment-wrapper'>
      <section className='head-comment'>
        <img src={`${avaComment}`} alt='avatar' className='avatar-comment' />
        <div className='wrapper-data-comment'>
          <h4 className='title-comment' data-test-id='comment-author'>{`${user.firstName} ${user.lastName}`}</h4>
          <p className='date-comment' data-test-id='comment-date'>
            {date}
          </p>
        </div>
      </section>
      <div className='grade__container' data-test-id='rating'>
        {arrayStars.map((item) => (
          <Star key={item.id} dataTestId={item.dataTestId} href={item.href} className={CLASSNAME_STAR_WINDOW} />
        ))}
      </div>
      {text ? (
        <p className='content-comment' data-test-id='comment-text'>
          {text}
        </p>
      ) : (
        false
      )}
    </article>
  );
};
