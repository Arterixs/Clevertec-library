import { useParams } from 'react-router-dom';

import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { userIdSelector } from '../../store/selectors/selectors';
import { IContentCardProps } from '../../types/interface/interface';
import { getValidUrlCategory } from '../../utils/helpers';

import { CardList } from './card-list';
import { NoContent } from './no-content';

export const ContentList = ({ arrayList, search, toggleStateModal, toggleStateModalReset }: IContentCardProps) => {
  const params = useParams();
  const pathUrl = getValidUrlCategory(params.category);
  const userId = useTypedSelector(userIdSelector);

  return (
    <section className='wrapper-content-list' data-test-id='content'>
      <NoContent flag={arrayList.length} search={search} />
      {arrayList.map((item) => (
        <CardList
          urlWay={pathUrl}
          search={search}
          userId={userId}
          toggleStateModal={toggleStateModal}
          toggleStateModalReset={toggleStateModalReset}
          {...item}
          key={item.id}
        />
      ))}
    </section>
  );
};
