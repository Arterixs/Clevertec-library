import { IRecallState } from '../../types/interface/interface';

export const ButtonRecall = (props: IRecallState) => (
  <button
    className={props.stateRecall ? 'button-recall button-recall_closed' : 'button-recall'}
    type='button'
    data-test-id='button-hide-reviews'
    onClick={props.toggleStateRecall}
  >
    <svg className='svg-arrow'>
      <use href='#arrow' x='6' />
    </svg>
  </button>
);
