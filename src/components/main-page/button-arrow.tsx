import { IAccordeonState } from '../../types/interface/interface';

export const ButtonArrow = (props: IAccordeonState) => (
  <button
    className={
      props.stateAccordeon
        ? `button-arrow button-arrow_active ${props.isActive ? '' : props.stateAccordeon ? '' : 'button-arrow_color'}`
        : `button-arrow ${props.isActive ? '' : 'button-arrow_color'}`
    }
    type='button'
  >
    <svg className='svg-arrow'>
      <use href='#arrow' x='6' />
    </svg>
  </button>
);
