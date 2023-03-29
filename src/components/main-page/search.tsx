import { useState } from 'react';

import { IContentToggle } from '../../types/interface/interface';
import { useResize } from '../../utils/helpers';

import { ButtonRatio } from './button-ratio';
import { ButtonToggle } from './button-toggle';
import { InputSearch } from './input-search';
import { SearchMobile } from './search-mobile';

export const Search = (props: IContentToggle) => {
  const { func, sort, setInput, search } = props;
  const widthWindow = useResize();
  const [window, setClickWindow] = useState(true);
  const [list, setClickList] = useState(false);
  const [stateSearch, setStateSearch] = useState(false);
  const toggleButtonSearch = () => setStateSearch(!stateSearch);
  const windowClick = () => {
    setClickList(false);
    setClickWindow(true);
    props.window();
  };
  const listClick = () => {
    setClickList(true);
    setClickWindow(false);
    props.list();
  };

  const arrIconButton = [
    {
      id: 1,
      icon: '#plit',
      className: 'button-position',
      data: 'button-menu-view-window',
      func: windowClick,
      state: window,
    },
    { id: 2, icon: '#list', className: 'button-position', data: 'button-menu-view-list', func: listClick, state: list },
  ];

  return (
    <section className='search-block'>
      <form action='#' className='form-search'>
        {widthWindow ? (
          <>
            <SearchMobile
              {...{ icon: '#loop', func: toggleButtonSearch, state: stateSearch, stateSort: false, setInput }}
            />
            <ButtonRatio {...{ icon: '#loop', func: toggleButtonSearch, state: stateSearch, stateSort: false }} />
          </>
        ) : (
          <InputSearch {...{ setInput, search }} />
        )}
        {stateSearch ? false : <ButtonRatio {...{ icon: '#sort', func, state: false, stateSort: sort }} />}
      </form>
      <div className='wrapper-button-toggle'>
        {stateSearch ? false : arrIconButton.map((item) => <ButtonToggle {...item} key={item.id} />)}
      </div>
    </section>
  );
};
