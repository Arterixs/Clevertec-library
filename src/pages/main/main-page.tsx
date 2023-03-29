import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { LoaderTwo } from '../../components/loaded/loader-two';
import { Content } from '../../components/main-page/content';
import { ContentList } from '../../components/main-page/content-list';
import { Search } from '../../components/main-page/search';
import { Modal } from '../../components/modal/modal';
import { useTypedSelector } from '../../store/hooks/use-typed-selector';
import { arrayListBookSelector, categoryBooksSelector, responseErrorSelector } from '../../store/selectors/selectors';
import {
  getValidUrlCategory,
  requestMainPageData,
  searchCategoryBreadLink,
  sortingBooksInCategory,
  sortingBooksInRating,
} from '../../utils/helpers';

export const MainPage = () => {
  const dispatch = useDispatch();
  const didLogref = useRef(false);
  const params = useParams();
  const categoryUrl = getValidUrlCategory(params.category);
  const categoryState = useTypedSelector(categoryBooksSelector);
  const path = searchCategoryBreadLink(categoryUrl, categoryState);
  const isError = useTypedSelector(responseErrorSelector);

  const arrayListBooks = useTypedSelector(arrayListBookSelector);
  const [sort, setSorting] = useState(false);
  const [content, setContent] = useState(true);
  const [stateModalBooking, setStateModalBooking] = useState(false);
  const [stateModalResetBooking, setStateModalResetBooking] = useState(false);
  const [value, setValue] = useState('');
  const [categories, setCategory] = useState(arrayListBooks);
  const getWindowContent = () => setContent(true);
  const getListContent = () => setContent(false);
  const toggleSortingButton = () => setSorting(!sort);
  const callModalResetBooking = () => setStateModalResetBooking(!stateModalResetBooking);
  const callModalBooking = () => setStateModalBooking(!stateModalBooking);
  const sortInRating = sortingBooksInRating(categories, sort);
  const searchArrayBookTitle = sortInRating.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));

  if (stateModalBooking || stateModalResetBooking) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  useEffect(() => {
    if (arrayListBooks.length) {
      const category = sortingBooksInCategory(arrayListBooks, path);

      setCategory([...category]);
    }
  }, [arrayListBooks, path]);

  useEffect(() => {
    if (!didLogref.current) {
      requestMainPageData(dispatch);
    }
    didLogref.current = true;
  }, [dispatch]);

  return (
    <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }} data-test-id='main-page'>
      <LoaderTwo />
      {(stateModalBooking || stateModalResetBooking) && (
        <Modal
          isCall={stateModalBooking}
          isCallReset={stateModalResetBooking}
          toggleStateModalReset={callModalResetBooking}
          toggleStateModal={callModalBooking}
        />
      )}
      <section className={isError ? 'main-hidden' : 'main-content'}>
        <Search
          {...{
            window: getWindowContent,
            list: getListContent,
            content,
            func: toggleSortingButton,
            sort,
            setInput: setValue,
            search: value,
          }}
        />
        {content ? (
          <Content
            arrayList={searchArrayBookTitle}
            search={value}
            toggleStateModal={callModalBooking}
            toggleStateModalReset={callModalResetBooking}
          />
        ) : (
          <ContentList
            arrayList={searchArrayBookTitle}
            search={value}
            toggleStateModal={callModalBooking}
            toggleStateModalReset={callModalResetBooking}
          />
        )}
      </section>
    </main>
  );
};
