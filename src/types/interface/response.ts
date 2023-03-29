export interface IResponseNewAvatar {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: IFormatsAvatar;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
}

interface IFormatsAvatar {
  thumbnail: IPatternAvatar;
  large: IPatternAvatar;
  medium: IPatternAvatar;
  small: IPatternAvatar;
}

interface IPatternAvatar {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface IBodyAuthResponse {
  avatar: string | null;
  blocked: boolean;
  confirmed: boolean;
  truecreatedAt: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  updateAt: string;
  username: string;
  booking: IBookingUser;
  delivery: IDeliveryUser;
  history: IHistoryUser;
  comments: ICommentsUser[] | null;
  role: IRoleUser;
}

export interface IRoleUser {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface ICommentsUser {
  id: number;
  rating: number;
  text: string | null;
  bookId: number;
}

export interface IHistoryUser {
  id: number | null;
  books: IBookUser[] | null;
}

export interface IDeliveryUser {
  id: number | null;
  handed: boolean | null;
  dateHandedFrom: string | null;
  dateHandedTo: string | null;
  book: IBookUser | null;
}

export interface IBookingUser {
  id: number | null;
  order: boolean | null;
  dateOrder: string | null;
  book: IBookUser | null;
}

export interface IBookUser {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  authors: string[];
  image: string | null;
}

export interface IDataIdBook {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string | null;
  description: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
  authors: string[] | null;
  images: IImage[] | null;
  categories: string[] | null;
  comments: ICommentsMeta[];
  booking: IBooking | null;
  delivery: IDelivery | null;
  histories: IHistories[] | null;
}

export interface IImage {
  url: string;
}

export interface ICommentsMeta {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: IUserMetaComments;
}

export interface IUserMetaComments {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface IBooking {
  id: number;
  order: boolean;
  dateOrder: string;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
}

export interface IDelivery {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  recipientId: number;
  recipientFirstName: string;
  recipientLastName: string;
}

export interface IHistories {
  id: number;
  userId: number;
}

export interface IListBooks {
  issueYear: string;
  rating: number | null;
  title: string;
  authors: string[];
  image: IImage | null;
  categories: string[];
  id: number;
  booking: IBooking | null;
  delivery: IDelivery | null;
  histories: IHistories[] | null;
}

export interface ICategoryBooks {
  name: string;
  path: string;
  id: number;
  data: string;
}
