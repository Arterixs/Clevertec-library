import { NavLink, useParams } from 'react-router-dom';

import { ICategoryBooks, IDataIdBook } from '../../types/interface/response';
import { getValidUrlCategory, searchCategoryBreadLink } from '../../utils/helpers';

export const NavList = (props: {
  isError: boolean;
  dataBook: IDataIdBook | null;
  isCategory: [] | ICategoryBooks[];
}) => {
  const { isError, dataBook, isCategory } = props;
  const params = useParams();
  const categoryUrl = getValidUrlCategory(params.category);
  const pathBreadCrumbs = searchCategoryBreadLink(categoryUrl, isCategory);

  return (
    <nav className='navigation-page'>
      <div className='nav-list'>
        <p className='nav-list__item'>
          <NavLink data-test-id='breadcrumbs-link' to={`/books/${categoryUrl}`}>
            {pathBreadCrumbs}
          </NavLink>
          <span className='link__content_slash'>/</span>
          <span data-test-id='book-name'>{!isError && dataBook?.title}</span>
        </p>
      </div>
    </nav>
  );
};
