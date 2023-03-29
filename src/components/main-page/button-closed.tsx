import { IButtonSearch } from '../../types/interface/interface';

export const ButtonClosed = (props: IButtonSearch) => (
  <button className='input-btn-closed' type='button' onClick={props.func} data-test-id='button-search-close'>
    <span className='btn-close' />
  </button>
);
