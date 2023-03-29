import { rootReducer } from '../store/reducers/root-reducer';

import {
  IActionBook,
  IActionCategory,
  IActionComment,
  IActionDataBooking,
  IActionDateOrder,
  IActionIdBooks,
  IActionList,
  IActionNavigation,
  ICloseWindow,
  IError,
  IErrorBooking,
  ILoaded,
  IResponseAuth,
  IResponseBodyAuth,
} from './interface/actions';
import { ICategoryBooks, IDataIdBook, IListBooks } from './interface/response';
import {
  IAuthSubmit,
  IContentToggle,
  IControlLoadedResponse,
  IFormRegSubmit,
  IFuncToogleBurgerMenu,
  IGenresProp,
  IInputForm,
  IPropsFuncBookReviewView,
  IPropsFuncBookView,
  IPropsResponseForm,
  IRegisterLink,
  ISearchBut,
  IStateBooking,
} from './interface/interface';

export type ActionsType = IActionList;
export type ActionsNav = IActionNavigation;
export type ActionBooking = IActionDateOrder | IActionBook | IActionDataBooking;
export type ActionsCategory = IActionCategory;
export type ActionComment = IActionComment;
export type ActionsGetIdBook = IActionIdBooks;
export type PropsErrorState = Omit<IControlLoadedResponse, 'isLoaded'>;
export type PropsInputSearch = Pick<IContentToggle, 'setInput' | 'search'>;
export type PropsMobileInput = Pick<IContentToggle, 'setInput'>;
export type PropsInputMoblieSearch = ISearchBut & PropsMobileInput;
export type PropsMetaData = Pick<
  IDataIdBook,
  'issueYear' | 'publish' | 'pages' | 'cover' | 'weight' | 'format' | 'ISBN' | 'producer' | 'categories'
>;
export type RootState = ReturnType<typeof rootReducer>;
export type CardProps = IListBooks & {
  urlWay: string;
  search: string;
  userId: number | undefined;
  toggleStateModal: () => void;
  toggleStateModalReset: () => void;
};
export type GenresProps = ICategoryBooks & IGenresProp;
export type AuthSubmit = Pick<IFormRegSubmit, 'username' | 'password'>;
export type FormSubmit = IInputForm | IAuthSubmit;
export type ActionResponse = IResponseAuth | IResponseBodyAuth;
export type AuthRegisterLink = Omit<IRegisterLink, 'func' | 'valid'>;
export type RequestRestoreProps = Pick<IPropsResponseForm, 'text' | 'title'>;
export type RequestBooking = { data: IStateBooking | { customer: number } };
export type ActionRespOfReqServer = IError | ILoaded | ICloseWindow | IErrorBooking;
export type PropsBookPageReviewView = IDataIdBook & IPropsFuncBookReviewView;
export type PropsBookPageBookView = IDataIdBook & IPropsFuncBookView;
export type PropsBurgerMenu = IFuncToogleBurgerMenu & ICategoryBooks;
export type AuthInput = 'identifier' | 'password';
