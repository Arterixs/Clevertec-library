import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { actionAuth } from '../store/actions/action-creaters';
import { useTypedSelector } from '../store/hooks/use-typed-selector';
import { categoryBooksSelector, responseErrorSelector } from '../store/selectors/selectors';
import { IBurgerState } from '../types/interface/interface';
import { ICategoryBooks } from '../types/interface/response';

import { ButtonArrow } from './main-page/button-arrow';
import { Genres } from './main-page/genres';

export const MenuBurger = (props: IBurgerState) => {
  const dispatch = useDispatch();
  const isError = useTypedSelector(responseErrorSelector);
  const genresState = useTypedSelector(categoryBooksSelector);
  const { burgerState, toggleBurgerMenu } = props;
  const [stateAccordeon, setStateAccordeon] = useState(true);
  const toggleAccordeon = () => setStateAccordeon(!stateAccordeon);
  const closedAccordeon = () => setStateAccordeon(false);
  const clickLogOut = () => {
    localStorage.removeItem('token');
    dispatch(actionAuth(false));
  };
  const clickDocs = () => {
    toggleBurgerMenu();
    closedAccordeon();
  };

  return (
    <div
      className={burgerState ? 'burger-menu-wrapper burger-menu-wrapper_active' : 'burger-menu-wrapper'}
      data-test-id='burger-navigation'
    >
      <div className='burger-menu-content'>
        <nav className='burger-menu__navigation'>
          <section className='burger-menu-nav'>
            <div className='menu-burger__wrap-title'>
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
                    data-test-id='burger-showcase'
                  >
                    <h2
                      className={
                        isActive || stateAccordeon
                          ? 'active-link__aside_title wrapper-title-aside__title'
                          : 'wrapper-title-aside__title'
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
                  data-test-id='burger-books'
                  onClick={toggleBurgerMenu}
                  className={({ isActive }) =>
                    isActive
                      ? 'wrapper-title-aside__subtitle wrapper-title-aside__subtitle_active-link '
                      : 'wrapper-title-aside__subtitle'
                  }
                >
                  Все книги
                </NavLink>
                <ul className='genres-block__content'>
                  {genresState.map((item: ICategoryBooks) => (
                    <Genres func={toggleBurgerMenu} {...item} data='burger' key={item.id} />
                  ))}
                </ul>
              </nav>
            </div>
            <NavLink
              className={({ isActive }) => (isActive ? 'active-link__aside' : 'menu-burger__docs-link')}
              to='/books/contract'
              onClick={clickDocs}
              data-test-id='burger-terms'
            >
              Правила пользования
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active-link__aside' : 'menu-burger__docs-link')}
              to='/books/oferta'
              onClick={clickDocs}
              data-test-id='burger-contract'
            >
              Договор оферты
            </NavLink>
          </section>
        </nav>
        <div className='burger-menu__control'>
          <section className='burger-menu-nav'>
            <a>Профиль</a>
            <NavLink to='/auth' onClick={clickLogOut} data-test-id='exit-button'>
              Выход
            </NavLink>
          </section>
        </div>
      </div>
    </div>
  );
};
