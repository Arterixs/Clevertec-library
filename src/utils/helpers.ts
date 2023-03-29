import { Dispatch, useEffect, useState } from 'react';
import { MultipleFieldErrors } from 'react-hook-form';
import { AnyAction } from 'redux';

import { requestBooking } from '../http/booking-book';
import { requestResetBooking } from '../http/cancellation-book';
import { requestChangeComment } from '../http/change-comment';
import { requestGetBookPage } from '../http/get-book-page';
import { requestGetCategoryBooks } from '../http/get-category-book';
import { requestGetListBooks } from '../http/get-list-books';
import { requestGetUser } from '../http/get-user';
import { requestNewComment } from '../http/new-comment';
import { requestRebooking } from '../http/rebooking';
import { requestSetAvatar } from '../http/set-avatar';
import { requestUpdataAvatar } from '../http/update-avatar';
import { requestUpdateUserData } from '../http/update-user-data';
import {
  actionAuth,
  actionBody,
  actionBookingErrorResponse,
  actionErrorResponse,
  actionLoadedResponse,
} from '../store/actions/action-creaters';
import { FormEditFielfs } from '../types/enum';
import { IFormEditSubmit, IRequestBooking, IRequestNewComment, IUpdateObjectUserEdit } from '../types/interface/interface';
import {
  IBooking,
  ICategoryBooks,
  ICommentsMeta,
  ICommentsUser,
  IDelivery,
  IImage,
  IListBooks,
} from '../types/interface/response';

import { UPGRADE_SEARCH_RESIZE } from './constants/constants';
import {
  ERROR_BOOKING,
  ERROR_RESPONSE,
  ERROR_TEXT,
  NEW_AVATAR_ERROR,
  NEW_AVATAR_SUCCES,
  REBOOKING_ERROR,
  REBOOKING_SUCCES,
  REG_ERROR,
  REG_SUCCESS,
  RESET_BOOKIG_SUCCES,
  RESET_BOOKING_ERROR,
  SUCCES_BOOKING,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCES,
} from './constants/response-request';
import { DEFAULT_PATH_BREAD } from './constants/text';
import { getStars } from './helper';

export const typeGuardArray = <T>(argument: T | undefined | null): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError('This value was promised to be there.');
  }

  return argument;
};

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width <= UPGRADE_SEARCH_RESIZE;
};

export const getAuthorString = (authors: string[] | null): string => {
  if (!Array.isArray(authors)) {
    return '';
  }
  let authorString = '';

  authors.forEach((item, indx, arr) => {
    if (indx + 1 === arr.length) {
      authorString += `${item}`;
    } else {
      authorString += `${item} `;
    }
  });

  return authorString;
};

export const convertDateDelivery = (date: string | null | undefined) => {
  if (!date) return '00.00';
  const createDate = new Date(date);
  let resultDay = '';
  let resultMonth = '';
  const day = createDate.getDate();
  const month = createDate.getMonth() + 1;

  if (day < 10) {
    resultDay = `0${day}`;
  } else {
    resultDay = `${day}`;
  }
  if (month < 10) {
    resultMonth = `0${month}`;
  } else {
    resultMonth = `${month}`;
  }
  const result = `${resultDay}.${resultMonth}`;

  return result;
};

export const getContentButtonCardBooks = (booking: IBooking | null, delivery: IDelivery | null): string => {
  let contentButton = '';

  if (booking?.dateOrder) {
    contentButton = 'Забронирована';
  } else if (delivery?.handed) {
    contentButton = `Занята до ${convertDateDelivery(delivery.dateHandedTo)}`;
  } else {
    contentButton = 'Забронировать';
  }

  return contentButton;
};

export const getValidIdUrl = (value: string | undefined): number => (value ? Number(value) : 0);

export const converterBooksCover = (images: IImage[]): string[] => {
  const arrayImageURL = images.map((item) => `https://strapi.cleverland.by${item.url}`);

  return arrayImageURL;
};

export const convertedDate = (date: string): string => {
  const arrayMonth = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const createDate = new Date(date);
  const day = createDate.getDate();
  const month = createDate.getMonth();
  const year = createDate.getFullYear();
  const result = `${day} ${arrayMonth[month]} ${year}`;

  return result;
};

export const getValidUrlCategory = (path: string | undefined): string => (path ? path : 'all');

export const searchCategoryBreadLink = (url: string, categoryState: ICategoryBooks[] | []) => {
  if (url === 'all') {
    return DEFAULT_PATH_BREAD;
  }
  if (categoryState.length) {
    const search = typeGuardArray(categoryState.find((item) => item.path === url));
    const pathName = search.name;

    return pathName;
  }

  return DEFAULT_PATH_BREAD;
};

export const sortingBooksInCategory = (arrayBooks: IListBooks[], category: string = DEFAULT_PATH_BREAD) => {
  if (category === DEFAULT_PATH_BREAD) {
    return arrayBooks;
  }

  const arrayCategory = arrayBooks.filter((item) => {
    const targetCategory = item.categories.find((it) => it === category);

    return targetCategory === category;
  });

  return arrayCategory;
};

export const getAmountBooks = (genresState: IListBooks[] | [], name: string) => {
  const arrBooksInCategory = genresState.map((item) => item.categories.filter((it) => it === name)).flat();

  return arrBooksInCategory;
};

export const convertNull = (value: number | null) => {
  if (value === null) {
    return 0;
  }

  return value;
};

export const sortingBooksInRating = (genresState: IListBooks[] | [], flag: boolean) => {
  const copyArray = genresState.slice();

  if (flag) {
    copyArray.sort((a, b) => convertNull(a.rating) - convertNull(b.rating));
  } else {
    copyArray.sort((a, b) => convertNull(b.rating) - convertNull(a.rating));
  }

  return copyArray;
};

export const getTypeInput = (eye: boolean) => (eye ? 'text' : 'password');

export const getNameFormReg = (name: string) => {
  switch (name) {
    case 'email':
      return name;
    case 'password':
      return name;
    case 'username':
      return name;
    case 'firstName':
      return name;
    case 'lastName':
      return name;
    case 'phone':
      return name;
    default:
      return 'email';
  }
};

export const getValidObj = (value: MultipleFieldErrors | undefined) => (value ? value : {});

export const stateDisabledButton = (
  handed: boolean | undefined,
  customerId: number | undefined,
  userId: number | undefined
) => {
  if (handed) {
    return true;
  }
  if (!customerId) {
    return false;
  }
  if (customerId === userId) {
    return false;
  }

  return true;
};

export const convertDateParametrHuman = (year: number, month: number, day: number, hours: number, minutes: number) => {
  let resultHours = '';
  let resultDay = '';
  let resultMonth = '';
  let resultMinutes = '';

  if (day < 10) {
    resultDay = `0${day}`;
  } else {
    resultDay = `${day}`;
  }
  if (month < 10) {
    resultMonth = `0${month}`;
  } else {
    resultMonth = `${month}`;
  }
  if (minutes < 10) {
    resultMinutes = `0${minutes}`;
  } else {
    resultMinutes = `${minutes}`;
  }
  if (hours < 10) {
    resultHours = `0${hours}`;
  } else {
    resultHours = `${hours}`;
  }

  return Number(`${year}${resultMonth}${resultDay}${resultHours}${resultMinutes}`);
};

export const convertSortingDate = (date: string) => {
  const convert = new Date(date);
  const year = convert.getFullYear();
  const month = convert.getMonth() + 1;
  const day = convert.getDate();
  const hours = convert.getHours();
  const minutes = convert.getMinutes();
  const result = convertDateParametrHuman(year, month, day, hours, minutes);

  return result;
};

export const sortingComments = (comments: ICommentsMeta[]) => {
  const copyArray = comments.slice();
  const newArrayComments = copyArray.sort((a, b) => convertSortingDate(b.createdAt) - convertSortingDate(a.createdAt));

  return newArrayComments;
};

export const sendRequestNewComment = async (
  data: IRequestNewComment,
  dispatch: Dispatch<AnyAction>,
  closeModal: () => void
) => {
  dispatch(actionLoadedResponse(true));
  await requestNewComment(data, dispatch);
  closeModal();
  dispatch(actionLoadedResponse(false));
};

export const sendRequestChangeComment = async (
  data: IRequestNewComment,
  dispatch: Dispatch<AnyAction>,
  closeModal: () => void,
  commentId: number
) => {
  dispatch(actionLoadedResponse(true));
  await requestChangeComment(data, dispatch, commentId);
  await requestGetBookPage(dispatch, data.data.book);
  closeModal();
  dispatch(actionLoadedResponse(false));
};

export const createObjectRequestComment = (comment: string, amountStars: number, bookId: number, userId: number) => {
  const objectRequest = {
    data: {
      rating: amountStars,
      text: comment,
      book: bookId,
      user: userId,
    },
  };

  return objectRequest;
};

export const createObjectRequestBooking = (order: boolean, dateOrder: string, bookId: number, userId: number) => {
  const objectRequest = {
    data: {
      order,
      dateOrder,
      book: bookId,
      customer: userId,
    },
  };

  return objectRequest;
};

export const sendRequestBooking = async (
  objectRequest: IRequestBooking,
  dispatch: Dispatch<AnyAction>,
  closeModal: () => void
) => {
  dispatch(actionLoadedResponse(true));
  const resultBooking = await requestBooking(objectRequest);
  const resultGetListBook = await requestGetListBooks(dispatch);

  if (resultBooking) {
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: true, text: ERROR_BOOKING }));
    closeModal();
    dispatch(actionLoadedResponse(false));

    return;
  }
  if (resultGetListBook) {
    dispatch(actionErrorResponse({ open: true, isError: true, text: ERROR_TEXT }));
    closeModal();
    dispatch(actionLoadedResponse(false));

    return;
  }
  dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: false, text: SUCCES_BOOKING }));
  closeModal();
  dispatch(actionLoadedResponse(false));
};

export const sendRequestResetBooking = async (
  bookId: number,
  dispatch: Dispatch<AnyAction>,
  closeModal: () => void
) => {
  dispatch(actionLoadedResponse(true));
  const resultResetBook = await requestResetBooking(bookId);

  if (resultResetBook === REG_ERROR) {
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: true, text: RESET_BOOKING_ERROR }));
    closeModal();
    dispatch(actionLoadedResponse(false));

    return;
  }
  const resultGetListBook = await requestGetListBooks(dispatch);

  if (resultGetListBook === REG_ERROR) {
    dispatch(actionErrorResponse({ open: true, isError: true, text: ERROR_TEXT }));
    closeModal();
    dispatch(actionLoadedResponse(false));

    return;
  }
  await requestGetUser(dispatch);
  dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: false, text: RESET_BOOKIG_SUCCES }));
  closeModal();
  dispatch(actionLoadedResponse(false));
};

export const sendRequestReBooking = async (
  objectRequest: IRequestBooking,
  dispatch: Dispatch<AnyAction>,
  closeModal: () => void,
  bookId: number
) => {
  dispatch(actionLoadedResponse(true));
  const resultReBooking = await requestRebooking(objectRequest, bookId);
  const resultGetListBook = await requestGetListBooks(dispatch);

  if (resultReBooking) {
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: true, text: REBOOKING_ERROR }));
    closeModal();
    dispatch(actionLoadedResponse(false));

    return;
  }
  if (resultGetListBook) {
    dispatch(actionErrorResponse({ open: true, isError: true, text: ERROR_TEXT }));
    closeModal();
    dispatch(actionLoadedResponse(false));

    return;
  }
  dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: false, text: REBOOKING_SUCCES }));
  closeModal();
  dispatch(actionLoadedResponse(false));
};

export const requetsBookPageData = async (dispatch: Dispatch<AnyAction>, id: number, isCategory: number) => {
  dispatch(actionLoadedResponse(true));
  dispatch(actionErrorResponse({ open: false, isError: false, text: '' }));
  const result = isCategory
    ? Promise.all([requestGetBookPage(dispatch, id)])
    : Promise.all([requestGetBookPage(dispatch, id), requestGetCategoryBooks(dispatch)]);
  const errors = (await result).find((item) => item === REG_ERROR);

  if (errors) {
    dispatch(actionErrorResponse({ open: true, isError: true, text: ERROR_TEXT }));
    dispatch(actionLoadedResponse(false));

    return;
  }
  dispatch(actionLoadedResponse(false));
};

export const requestMainPageData = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(actionLoadedResponse(true));
  dispatch(actionErrorResponse({ open: false, isError: false, text: '' }));
  const result = Promise.all([requestGetListBooks(dispatch), requestGetCategoryBooks(dispatch)]);
  const errors = (await result).find((item) => item === REG_ERROR);

  if (errors) {
    dispatch(actionErrorResponse({ open: true, isError: true, text: ERROR_TEXT }));
    dispatch(actionLoadedResponse(false));

    return;
  }
  dispatch(actionLoadedResponse(false));
};

export const firstRequestGetUser = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(actionLoadedResponse(true));
  dispatch(actionErrorResponse({ open: false, isError: false, text: '' }));
  const result = await requestGetUser(dispatch);

  if (result !== REG_SUCCESS) {
    dispatch(actionErrorResponse({ open: true, isError: true, text: ERROR_TEXT }));
    dispatch(actionLoadedResponse(false));
  }
  dispatch(actionLoadedResponse(false));
};

export const logOut = (dispatch: Dispatch<AnyAction>) => {
  localStorage.removeItem('token');
  dispatch(actionAuth(false));
};

const createObjectRequest = (id: number) => {
  const object = { avatar: id };

  return object;
};

export const requestNewAvatar = async (data: FormData, dispatch: Dispatch<AnyAction>, userId: number) => {
  dispatch(actionLoadedResponse(true));
  const setAvatar = await requestSetAvatar(data);

  if (setAvatar === ERROR_RESPONSE) {
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: true, text: NEW_AVATAR_ERROR }));
    dispatch(actionLoadedResponse(false));

    return;
  }
  const bodyRequest = createObjectRequest(setAvatar);
  const updateAvatar = await requestUpdataAvatar(bodyRequest, userId);

  if (updateAvatar === ERROR_RESPONSE) {
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: true, text: NEW_AVATAR_ERROR }));
    dispatch(actionLoadedResponse(false));

    return;
  }
  dispatch(actionBody(updateAvatar));
  dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: false, text: NEW_AVATAR_SUCCES }));
  dispatch(actionLoadedResponse(false));
};

export const getRequsetUpdateUserData = async (
  data: IUpdateObjectUserEdit,
  userId: number | undefined,
  dispatch: Dispatch<AnyAction>
) => {
  if (!userId) return;
  dispatch(actionLoadedResponse(true));
  const response = await requestUpdateUserData(data, userId);

  if (response === ERROR_RESPONSE) {
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: true, text: UPDATE_USER_ERROR }));
    dispatch(actionLoadedResponse(false));

    return;
  }
  dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: false, text: UPDATE_USER_SUCCES }));
  dispatch(actionLoadedResponse(false));
};

export const sendResetBooking = async (bookId: number, dispatch: Dispatch<AnyAction>) => {
  dispatch(actionLoadedResponse(true));
  const resultResetBook = await requestResetBooking(bookId);

  await requestGetUser(dispatch);
  if (resultResetBook === REG_ERROR) {
    dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: true, text: RESET_BOOKING_ERROR }));
    dispatch(actionLoadedResponse(false));

    return;
  }
  const resultGetListBook = await requestGetListBooks(dispatch);

  if (resultGetListBook === REG_ERROR) {
    dispatch(actionErrorResponse({ open: true, isError: true, text: ERROR_TEXT }));
    dispatch(actionLoadedResponse(false));

    return;
  }
  dispatch(actionBookingErrorResponse({ open: true, isErrorBooking: false, text: RESET_BOOKIG_SUCCES }));
  dispatch(actionLoadedResponse(false));
};

export const convertDataForm = (data: IFormEditSubmit) => {
  const object: IUpdateObjectUserEdit = {
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    email: undefined,
    username: undefined,
  };

  Object.keys(data).forEach((item) => {
    const key = item as keyof typeof data;

    if (key === FormEditFielfs.LOGIN) {
      object.username = data[key];
    } else {
      object[key] = data[key];
    }
  });

  return object;
};

export const checkedAuthors = (array: string[] | null | undefined) => {
  if (!array) {
    return [];
  }

  return array;
};

export const convertingStarGrade = (stars: number | null | undefined) => {
  if (!stars) {
    return getStars(0);
  }
  const amount = Math.floor(stars);

  return getStars(amount);
};

export const convertDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return { year, month, day, hours, minutes };
};

export const calculateDateDelay = (date: string | null | undefined) => {
  if (!date) return false;
  const currentDate = new Date();
  const delayDate = new Date(date);
  const currentDateObject = convertDate(currentDate);
  const delayDateObject = convertDate(delayDate);
  const currentNumber = convertDateParametrHuman(
    currentDateObject.year,
    currentDateObject.month,
    currentDateObject.day,
    currentDateObject.hours,
    currentDateObject.minutes
  );
  const delayNumber = convertDateParametrHuman(
    delayDateObject.year,
    delayDateObject.month,
    delayDateObject.day,
    delayDateObject.hours,
    delayDateObject.minutes
  );

  if (currentNumber > delayNumber) {
    return true;
  }

  return false;
};

export const chekedcommentInBook = (bookId: number | undefined, comment: ICommentsUser[] | null | undefined) => {
  if (!bookId || !comment) return false;
  const findId = comment.find((item) => bookId === item.bookId);

  if (findId) {
    return true;
  }

  return false;
};

export const getInfoComment = (historyComments: ICommentsUser[], bookId: number) => {
  const objectInfo = historyComments.map((item) => {
    if (item.bookId === bookId) {
      if (item.text !== null) {
        return { text: item.text, rating: item.rating, commentId: item.id, bookId };
      }

      return { text: '', rating: item.rating, commentId: item.id, bookId };
    }

    return null;
  });

  return objectInfo;
};

export const chekedComment = (comments: ICommentsMeta[], userId: number | undefined) => {
  if (!comments) return false;
  if (userId) {
    const findUser = comments.find((item) => item.user.commentUserId === userId);

    if (findUser && findUser.user.commentUserId) {
      return true;
    }

    return false;
  }

  return true;
};

export const checkCommentUser = (bookComments: ICommentsMeta[] | undefined, userId: number | undefined) => {
  if (!bookComments || !userId) return [null];
  const objectInfo = bookComments.map((item) => {
    if (item.id === userId) {
      if (item.text !== null) {
        return { text: item.text, rating: item.rating, commentId: item.id };
      }

      return { text: '', rating: item.rating, commentId: item.id };
    }

    return null;
  });

  return objectInfo;
};
