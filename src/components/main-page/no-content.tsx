import { NO_BOOKS_IN_CATEGORY, NO_BOOKS_IN_SEARCH } from '../../utils/constants/text';

export const NoContent = (props: { flag: number; search: string }) => {
  const { flag, search } = props;

  return (
    <div
      data-test-id='search-result-not-found'
      className={flag ? 'wrapper-error-content no-content_hidden' : 'wrapper-error-content'}
    >
      <p data-test-id='empty-category' className='no-content'>
        {search ? NO_BOOKS_IN_SEARCH : NO_BOOKS_IN_CATEGORY}
      </p>
    </div>
  );
};
