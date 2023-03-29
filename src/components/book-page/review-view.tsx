import { PropsBookPageReviewView } from '../../types/types';

import { MetaInfo } from './meta-info';
import { Ratio } from './ratio';
import { RatioEmpty } from './ratio-empty';
import { Recall } from './recall';
import { RecallEmpty } from './recall-empty';

export const ReviewView = (props: PropsBookPageReviewView) => {
  const {
    issueYear,
    publish,
    pages,
    cover,
    weight,
    format,
    ISBN,
    producer,
    categories,
    rating,
    comments,
    toggleState,
    callModal,
  } = props;

  return (
    <section className='body-books-page'>
      {rating ? <Ratio rating={rating} /> : <RatioEmpty rating={rating} />}
      <MetaInfo {...{ issueYear, publish, pages, cover, weight, format, ISBN, producer, categories }} />
      {rating ? (
        <Recall coments={comments} callModal={callModal} toggleState={toggleState} />
      ) : (
        <RecallEmpty coments={comments} callModal={callModal} toggleState={toggleState} />
      )}
    </section>
  );
};
