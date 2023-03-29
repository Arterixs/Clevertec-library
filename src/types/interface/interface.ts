import { Dispatch, SyntheticEvent } from 'react';
import { Control, FieldError, FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { AnyAction } from 'redux';

import { IBodyAuthResponse, ICategoryBooks, IDataIdBook, IListBooks } from './response';
import { FormEditFielfs } from '../enum';
import { AuthInput, AuthSubmit } from '../types';

export interface IButtonToggle {
  id: number;
  icon: string;
  className: string;
  data: string;
  func: () => void;
  state: boolean;
}

export interface IContentCardProps {
  arrayList: IListBooks[];
  search: string;
  toggleStateModal: () => void;
  toggleStateModalReset: () => void;
}

export interface IContentToggle {
  window: () => void;
  list: () => void;
  content: boolean;
  func: () => void;
  sort: boolean;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  search: string;
}

export interface ISwiperData {
  amountSliderCovers: number;
  amountBooksCover: string[] | [];
}

export interface IAccordeonState {
  stateAccordeon: boolean;
  isActive: boolean;
}

export interface IRecallState {
  toggleStateRecall: () => void;
  stateRecall: boolean;
}

export interface ISearchBut {
  icon: string;
  func: () => void;
  state: boolean;
  stateSort: boolean;
}

export interface IButtonSearch {
  icon: string;
  func: () => void;
  state: boolean;
}

export interface IBurgerState {
  burgerState: boolean;
  toggleBurgerMenu: () => void;
}

export interface IINititalState {
  list: IListBooks[] | [];
}

export interface IResponseState {
  auth: boolean;
  user: IBodyAuthResponse | null;
}

export interface IResponseRequestOfServer {
  isLoaded: boolean;
  isErrorBooking: boolean;
  isError: boolean;
  text: string;
  open: boolean;
}

export interface IStateCategory {
  category: ICategoryBooks[] | [];
}

export interface IStateComment {
  text: string;
  commentId: number;
  bookId: number;
  rating: number;
}

export interface IFuncToogleBurgerMenu {
  func?: () => void;
}

export interface IStateBooking {
  order: boolean;
  dateOrder: string;
  book: number;
  currentBook: number;
}

export interface IStateNavigation {
  path: string;
}

export interface IStateBookPage {
  book: null | IDataIdBook;
}

export interface IGenresProp {
  disp?: Dispatch<AnyAction>;
  func?: () => void;
  arrayCat: string[][];
}

export interface IObjectActionError {
  open: boolean;
  isError: boolean;
  text: string;
}

export interface IObjectActionBookingError {
  open: boolean;
  isErrorBooking: boolean;
  text: string;
}

export interface IPropsFuncBookReviewView {
  callModal: () => void;
  toggleState: (flag: boolean) => void;
}

export interface IPropsFuncBookView {
  toggleStateModal: () => void;
  toggleStateModalReset: () => void;
}

export interface IControlLoadedResponse {
  isLoaded: boolean;
  isError: boolean;
}

export interface IBackLightProps {
  valueInput: string;
  valueTitle: string;
}

export interface IRegisterLink {
  func: () => void;
  textButton: string;
  path: string;
  question: string;
  textLink: string;
  valid: boolean;
}

export interface IFormRegSubmit {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface IFormEditSubmit {
  login: string | undefined;
  password: string;
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}

export interface IFormForgotMail {
  email: string;
}

export interface IFormForgotPass {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export interface IFormAuthSubmit {
  identifier: string;
  password: string;
}

export interface IFormRestoreSubmit {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export interface IAuthSubmit {
  type: string;
  placeholder: string;
  reg: UseFormRegister<AuthSubmit>;
}

export interface IInputForm {
  type: string;
  placeholder: string;
  name: string;
  rules: any;
  reg: UseFormRegister<IFormRegSubmit>;
  error: FieldErrors<IFormRegSubmit>;
  toggleFocus?: () => void;
  control?: Control<IFormRegSubmit, any>;
}

export interface IPropsResponseForm {
  title: string;
  text: string;
  textButton: string;
  path: string;
  func: () => void;
}

export interface IRegisterRestore {
  textButton: string;
  question: string;
  disabled: boolean;
}

export interface IModalBooking {
  isCall: boolean;
  toggleStateModal: () => void;
  toggleStateModalReset: () => void;
  isCallReset: boolean;
}

export interface IButtonDaysProps {
  day: number;
  weekend: boolean;
  currentDay: boolean;
  dayBooking: boolean;
  key: number;
  calculateDateBooking: (id: number) => void;
  bookingDay: number;
}

export interface IDateInMonthDay {
  day: number;
  isWeekend: boolean;
  isCurrentDay: boolean;
  isBooking: boolean;
  id: number;
}

export interface IPropsDropDown {
  month: number;
  year: number;
  changeMonth: (month: number) => void;
}

export interface IPropsDatePicker {
  newMonth: number;
  newYear: number;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  calculateDateBooking: (id: number) => void;
  bookingDay: number;
}

export interface IPropsCalendar {
  calculateDateBooking: (id: number) => void;
  bookingDay: number;
}

export interface IPropsButtonModalSubBooking {
  text: string;
  disable: boolean;
  submit: () => Promise<void>;
  data: string;
  flag: boolean;
}

export interface CombineReducer {
  listBooks: IINititalState;
  categoryBooks: IStateCategory;
  bookPage: IStateBookPage;
  response: IResponseState;
  booking: IStateBooking;
  commonStateResponse: IResponseRequestOfServer;
  comment: IStateComment;
}

interface IDataNewComment {
  rating: number;
  text: string;
  book: number;
  user: number;
}

export interface IRequestNewComment {
  data: IDataNewComment;
}

export interface IDataBooking {
  order: boolean;
  dateOrder: string;
  book: number;
  customer: number;
}

export interface IRequestBooking {
  data: IDataBooking;
}

export interface IAmountStars {
  element: JSX.Element;
  id: number;
}

export interface IInputProps {
  placeholder: string;
  type: 'password' | 'text' | 'phone' | 'mail';
  disable: boolean;
  values?: string;
  nameFeild: FormEditFielfs;
  register: UseFormRegister<IFormEditSubmit>;
  rules?: RegisterOptions;
  errors?: FieldError | undefined;
  dirtyFields?: boolean | undefined;
}

export interface IUpdateObjectUserEdit {
  username: string | undefined;
  password: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
}

export interface IButtonFormProps {
  text: string;
  types?: boolean;
  disable: boolean;
  func?: () => void;
  data: string;
}

export interface IButtonProfileProps {
  func: (e: SyntheticEvent) => void;
  disable: boolean;
  data: string;
  text: string;
  className: string;
}

export interface IEye {
  func: () => void;
  flag: boolean;
}

export interface IInputAuth {
  type: string;
  placeholder: string;
  name: AuthInput;
  reg: UseFormRegister<IFormAuthSubmit>;
  error: FieldErrors<IFormAuthSubmit>;
  state: boolean;
  toggle: () => void;
}

export interface IInputForgot {
  placeholder: string;
  name: 'password' | 'passwordConfirmation';
  reg: UseFormRegister<IFormForgotPass>;
  error: FieldErrors<IFormForgotPass>;
  rules?: any;
  toggleFocus: () => void;
  stateType: boolean;
  onChange?: () => void;
  onBlur?: boolean;
  onFocus?: () => void
}

export interface IInputForgotMail {
  reg: UseFormRegister<IFormForgotMail>;
  error: FieldErrors<IFormForgotMail>;
  func: () => void;
}
