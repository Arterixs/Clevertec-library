import { IButtonToggle } from '../../types/interface/interface';

export const ButtonToggle = (props: IButtonToggle) => {
  const classElem = props.state ? `${props.className} button-position_active` : props.className;

  return (
    <button className={classElem} type='button' data-test-id={props.data} onClick={props.func}>
      <svg className='search-rating'>
        <use href={props.icon} />
      </svg>
    </button>
  );
};
