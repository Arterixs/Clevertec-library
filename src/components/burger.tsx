import { IBurgerState } from '../types/interface/interface';

export const Burger = (props: IBurgerState) => {
  const { burgerState, toggleBurgerMenu } = props;

  return (
    <button
      className={burgerState ? 'burger-menu burger-menu_active' : 'burger-menu'}
      type='button'
      data-test-id='button-burger'
      onClick={toggleBurgerMenu}
    >
      <span className={burgerState ? 'burger-menu__middle burger-menu__middle_active' : 'burger-menu__middle'} />
    </button>
  );
};
