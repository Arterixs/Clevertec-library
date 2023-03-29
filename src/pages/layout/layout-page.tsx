import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header/header';
import { Sprite } from '../../components/sprite';

export const Layout = () => {
  const [burgerState, setBurgerState] = useState(false);
  const toggleBurgerMenu = () => setBurgerState(!burgerState);

  return (
    <div className='container'>
      {burgerState && (
        <div
          className='wrapper-content-burger'
          onClick={toggleBurgerMenu}
          onKeyUp={() => {}}
          role='button'
          tabIndex={0}
          aria-label='burger-menu'
        />
      )}
      <div className='wrapper'>
        <Header {...{ burgerState, toggleBurgerMenu }} />
        <Outlet />
        <Footer />
      </div>
      <Sprite />
    </div>
  );
};
