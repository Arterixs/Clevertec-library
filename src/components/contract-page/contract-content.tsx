import {
  ONE,
  ONE_FOUR,
  ONE_ONE,
  ONE_THREE,
  ONE_TWO,
  THREE,
  THREE_FOUR,
  THREE_ONE,
  THREE_ONE_ONE,
  THREE_ONE_TWO,
  THREE_THREE,
  THREE_THREE_ONE,
  THREE_THREE_ONE_ONE,
  THREE_THREE_ONE_TWO,
  THREE_TWO,
  TWO,
  TWO_ONE,
  TWO_ONE_ONE,
  TWO_ONE_TWO,
  TWO_TWO,
} from '../../utils/lorem';

export const ContractContent = () => (
  <section className='contract-content-block'>
    <ol className='main-list__item-contracts'>
      <li>
        {ONE}
        <ol className='two-list__item-contracts'>
          <li>{ONE_ONE}</li>
          <li>{ONE_TWO}</li>
          <li>{ONE_THREE}</li>
          <li>{ONE_FOUR}</li>
        </ol>
      </li>
      <li>
        {TWO}
        <ol className='two-list__item-contracts'>
          <li>
            {TWO_ONE}
            <ol className='three-list__item-contracts'>
              <li>{TWO_ONE_ONE}</li>
              <li>{TWO_ONE_TWO}</li>
            </ol>
          </li>
          <li>{TWO_TWO}</li>
        </ol>
      </li>
      <li>
        {THREE}
        <ol className='two-list__item-contracts'>
          <li>
            {THREE_ONE}
            <ol className='three-list__item-contracts'>
              <li>{THREE_ONE_ONE}</li>
              <li>{THREE_ONE_TWO}</li>
            </ol>
          </li>
          <li>{THREE_TWO}</li>
          <li>
            {THREE_THREE}
            <ol className='three-list__item-contracts'>
              <li>
                {THREE_THREE_ONE}
                <ol className='four-list__item-contracts'>
                  <li>{THREE_THREE_ONE_ONE}</li>
                  <li>{THREE_THREE_ONE_TWO}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li>{THREE_FOUR}</li>
        </ol>
      </li>
    </ol>
  </section>
);
