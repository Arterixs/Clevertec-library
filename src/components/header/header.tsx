import { Link, useLocation } from 'react-router-dom';

import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { responseOpenWindowSelector } from '../../store/selectors/selectors';
import { IBurgerState } from '../../types/interface/interface';
import { PATH_PROFILE } from '../../utils/constants/path-url';
import { Burger } from '../burger';
import { LoaderTwo } from '../loaded/loader-two';
import { WindowMessage } from '../loaded/window-message';
import { MenuBurger } from '../menu-burger';

import { UserBlock } from './user-block/user-block';

import styles from './header.module.css';

export const Header = (props: IBurgerState) => {
  const path = useLocation().pathname;
  const { burgerState, toggleBurgerMenu } = props;
  const isOpen = useTypedSelector(responseOpenWindowSelector);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        {isOpen && <WindowMessage />}
        <LoaderTwo />
        <MenuBurger {...{ burgerState, toggleBurgerMenu }} />
        <Burger {...{ burgerState, toggleBurgerMenu }} />
        <div className={styles['wrapper-logo']}>
          <Link to='/books/all' className={styles['block-logo']}>
            <svg className={styles.logo}>
              <use href='#logo' />
            </svg>
            <h2 className={styles['logo-title']}>Cleverland</h2>
          </Link>
        </div>
        <div className={styles['block-subtitle']}>
          <h1 className={styles.subtitle}>{path === PATH_PROFILE ? 'Личный кабинет' : 'Библиотека'}</h1>
        </div>
        <UserBlock />
      </div>
    </header>
  );
};
