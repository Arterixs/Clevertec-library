import { ISearchBut } from '../../types/interface/interface';

export const ButtonRatio = (props: ISearchBut) => {
  const { state, icon, func, stateSort } = props;

  return (
    <button
      className={state ? 'search-hidden' : 'form-search__button'}
      type='button'
      data-test-id={icon === '#loop' ? 'button-search-open' : 'sort-rating-button'}
      onClick={func}
    >
      <div className='block-button__search'>
        <svg className={stateSort ? 'search-rating search-rating_active' : 'search-rating'}>
          <use href={icon} />
        </svg>
        <span className='block-button_span'>По рейтингу</span>
      </div>
    </button>
  );
};
