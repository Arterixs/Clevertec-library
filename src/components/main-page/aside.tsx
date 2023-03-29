import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { categoryBooksSelector, responseErrorSelector } from '../../store/selectors/selectors';
import { ICategoryBooks } from '../../types/interface/response';

import { ButtonArrow } from './button-arrow';
import { Genres } from './genres';

export const Aside = () => {
  const isError = useTypedSelector(responseErrorSelector);
  const genresState = useTypedSelector(categoryBooksSelector);
  const [stateAccordeon, setStateAccordeon] = useState(true);
  const toggleAccordeon = () => setStateAccordeon(!stateAccordeon);
  const closedAccordeon = () => setStateAccordeon(false);

  return (
    <aside className='aside'>
      <section className='aside__content'>
        <NavLink to='/books/all'>
          {({ isActive }) => (
            <div
              className={
                isActive || stateAccordeon
                  ? 'wrapper-title-aside wrapper-title-aside_active-link'
                  : 'wrapper-title-aside'
              }
              onClick={isError ? undefined : toggleAccordeon}
              onKeyUp={() => {}}
              role='button'
              tabIndex={0}
              data-test-id='navigation-showcase'
            >
              <h2
                className={
                  isActive || stateAccordeon
                    ? 'active-link__aside_title wrapper-title-aside__title'
                    : 'wrapper-title-aside__title wrapper-title-aside__title_color'
                }
              >
                Витрина книг
              </h2>
              {isError ? null : <ButtonArrow {...{ stateAccordeon, isActive }} key='1' />}
            </div>
          )}
        </NavLink>
        <nav className={isError || !stateAccordeon ? 'genres-block_hidden' : 'genres-block'}>
          <NavLink
            to='/books/all'
            data-test-id='navigation-books'
            onClick={() => {}}
            className={({ isActive }) =>
              isActive
                ? 'wrapper-title-aside__subtitle wrapper-title-aside__subtitle_active-link '
                : 'wrapper-title-aside__subtitle wrapper-title-aside__title_color'
            }
          >
            Все книги
          </NavLink>
          <ul className='genres-block__content'>
            {genresState.map((item: ICategoryBooks) => (
              <Genres {...item} data='navigation' key={item.id} />
            ))}
          </ul>
        </nav>
      </section>
      <section className='aside__link-docs'>
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link__aside' : ':')}
          to='/books/contract'
          onClick={closedAccordeon}
          data-test-id='navigation-terms'
        >
          Правила пользования
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link__aside' : ':')}
          to='/books/oferta'
          onClick={closedAccordeon}
          data-test-id='navigation-contract'
        >
          Договор оферты
        </NavLink>
      </section>
    </aside>
  );
};
