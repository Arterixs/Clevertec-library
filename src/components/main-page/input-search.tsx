import { FormEvent } from 'react';

import { PropsInputSearch } from '../../types/types';

export const InputSearch = (props: PropsInputSearch) => {
  const { setInput, search } = props;
  const setInputValue = (event: FormEvent) => {
    if (event.target instanceof HTMLInputElement) {
      setInput(event.target.value);
    }
  };

  return (
    <div className='wrappper-search _open'>
      <input
        type='text'
        className='form-search__search'
        placeholder='Поиск книги или автора…'
        data-test-id='input-search'
        onInput={setInputValue}
      />
      <svg className={search ? 'search-icon search-icon_focus' : 'search-icon'}>
        <use href='#loop' />
      </svg>
    </div>
  );
};
