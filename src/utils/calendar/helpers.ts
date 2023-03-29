import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { actionDateOrder } from '../../store/actions/action-creaters';

import {
  ARRAY_MONTHS_DICTIONARY,
  FIRST_DAY_OF_THE_MONTH,
  MONDAY,
  NUMBER_OF_DAY_IN_THE_CALENDAR,
  NUMBER_OF_DAY_IN_THE_CALENDAR_INCREASE,
  ONE_DAY,
  ONE_MONTH,
  SATURDAY,
  SIX_DAY,
  SPECIAL_NUMBER,
  SUNDAY,
  TWO_DAYS,
} from './constants';

export const currentDate = (date: Date) => {
  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  return { day: currentDay, month: currentMonth, year: currentYear };
};

export const getAmountOfDayInTheMonth = (year: number, month: number) =>
  SPECIAL_NUMBER - new Date(year, month, SPECIAL_NUMBER).getDate();

export const dayInWeek = (year: number, month: number, day: number) => new Date(year, month, day).getDay();

export const getBookingDays = (currentDay: number, currentYear: number, currentMonth: number) => {
  if (!currentDay) {
    return [];
  }
  const currentDayOfTheWeek = dayInWeek(currentYear, currentMonth, currentDay);

  if (currentDayOfTheWeek === SATURDAY) {
    return [currentDay + TWO_DAYS];
  }
  if (currentDayOfTheWeek === SUNDAY) {
    return [currentDay + ONE_DAY];
  }
  const nextDay = currentDay + ONE_DAY;
  const nextDayOfTheWeek = dayInWeek(currentYear, currentMonth, nextDay);

  if (nextDayOfTheWeek === SATURDAY) {
    return [currentDay, nextDay + TWO_DAYS];
  }
  if (nextDayOfTheWeek === SUNDAY) {
    return [currentDay, nextDay + ONE_DAY];
  }

  return [currentDay, nextDay];
};

export const isWeekendCheck = (dayWeek: number) => {
  if (dayWeek === SATURDAY || dayWeek === SUNDAY) {
    return true;
  }

  return false;
};

export const IsPossibleToBookThisDay = (bookingDays: number[], currentDay: number) => {
  const bookingDaySearch = bookingDays.find((item) => item === currentDay);

  if (bookingDaySearch) {
    return true;
  }

  return false;
};

export const getDaysBeforeTheStartOfTheCurrentMonth = (firstDayInWeek: number) => {
  if (firstDayInWeek !== SUNDAY) {
    return firstDayInWeek - ONE_DAY;
  }

  return SIX_DAY;
};

export const currentDayCheck = (currentDay: number, day: number) => (currentDay === day ? true : false);

export const calculateDaysOfPrevMonth = (amoundDay: number, differentDay: number, currentDay: number) =>
  amoundDay + ONE_DAY - (differentDay - currentDay);

export const calculateNumbersOfDaysInCalendar = (differentDay: number, amountDayInMonth: number) => {
  const summDay = differentDay + amountDayInMonth;

  if (summDay > NUMBER_OF_DAY_IN_THE_CALENDAR) {
    return NUMBER_OF_DAY_IN_THE_CALENDAR_INCREASE;
  }

  return NUMBER_OF_DAY_IN_THE_CALENDAR;
};

export const generateDataOfTheMonthMondayDay = (
  currentYear: number,
  currentMonth: number,
  amountDayInMonth: number,
  bookingDays: number[],
  currentDay: number,
  flag: boolean
) => {
  const arrayOfDays = [];
  let counterNextDayMonth = 1;

  for (let i = 0; i < NUMBER_OF_DAY_IN_THE_CALENDAR; i += 1) {
    if (i < amountDayInMonth) {
      const numberOfDay = i + ONE_DAY;
      const dayOfTheWeek = dayInWeek(currentYear, currentMonth, numberOfDay);
      const isWeekend = flag ? isWeekendCheck(dayOfTheWeek) : false;
      const isCurrentDay = currentDayCheck(currentDay, numberOfDay);
      const isBooking = IsPossibleToBookThisDay(bookingDays, numberOfDay);
      const dataAboutTheDay = {
        day: numberOfDay,
        isWeekend,
        isCurrentDay,
        isBooking,
        id: i,
      };

      arrayOfDays.push(dataAboutTheDay);
    } else {
      const dataAboutTheDay = {
        day: counterNextDayMonth,
        isWeekend: false,
        isCurrentDay: false,
        isBooking: false,
        id: i,
      };

      arrayOfDays.push(dataAboutTheDay);
      counterNextDayMonth += 1;
    }
  }

  return arrayOfDays;
};

export const generateDataMonth = (
  currentYear: number,
  currentMonth: number,
  amountDayInMonth: number,
  bookingDays: number[],
  currentDay: number,
  firstDayOfTheMonthDayOfTheWeek: number,
  flag: boolean
) => {
  const arrayOfDays = [];
  const previousMonth = currentMonth - ONE_MONTH;
  const amountDayInPreviousMonth = getAmountOfDayInTheMonth(currentYear, previousMonth);
  const daysBeforeStartCurrMonth = getDaysBeforeTheStartOfTheCurrentMonth(firstDayOfTheMonthDayOfTheWeek);
  const numberOfDaysInTheCalendar = calculateNumbersOfDaysInCalendar(daysBeforeStartCurrMonth, amountDayInMonth);
  let counterNextMonthOfDay = 1;
  let iterationCounter = 0;

  for (let i = 0; i < numberOfDaysInTheCalendar; i += 1) {
    if (i < daysBeforeStartCurrMonth) {
      const dateOfTheDay = calculateDaysOfPrevMonth(amountDayInPreviousMonth, daysBeforeStartCurrMonth, i);
      const dataAboutTheDay = {
        day: dateOfTheDay,
        isWeekend: false,
        isCurrentDay: false,
        isBooking: false,
        id: i,
      };

      arrayOfDays.push(dataAboutTheDay);
    } else if (iterationCounter < amountDayInMonth) {
      const dateOfTheDay = iterationCounter + ONE_DAY;
      const dayOfTheWeek = dayInWeek(currentYear, currentMonth, dateOfTheDay);
      const isWeekend = flag ? isWeekendCheck(dayOfTheWeek) : false;
      const isCurrentDay = currentDayCheck(currentDay, dateOfTheDay);
      const isBooking = IsPossibleToBookThisDay(bookingDays, dateOfTheDay);
      const dataAboutTheDay = {
        day: dateOfTheDay,
        isWeekend,
        isCurrentDay,
        isBooking,
        id: i,
      };

      arrayOfDays.push(dataAboutTheDay);
      iterationCounter += 1;
    } else {
      const dataAboutTheDay = {
        day: counterNextMonthOfDay,
        isWeekend: false,
        isCurrentDay: false,
        isBooking: false,
        id: i,
      };

      arrayOfDays.push(dataAboutTheDay);
      counterNextMonthOfDay += 1;
    }
  }

  return arrayOfDays;
};

export const getCurrentCalendar = (currentMonth: number, currentYear: number, currentDay = 0, flag = true) => {
  const amountDayInMonth = getAmountOfDayInTheMonth(currentYear, currentMonth);
  const firstDayOfTheMonthDayOfTheWeek = dayInWeek(currentYear, currentMonth, FIRST_DAY_OF_THE_MONTH);
  const bookingDays = getBookingDays(currentDay, currentYear, currentMonth);

  if (firstDayOfTheMonthDayOfTheWeek === MONDAY) {
    const arrayOfDays = generateDataOfTheMonthMondayDay(
      currentYear,
      currentMonth,
      amountDayInMonth,
      bookingDays,
      currentDay,
      flag
    );

    return arrayOfDays;
  }
  const arrayOfDays = generateDataMonth(
    currentYear,
    currentMonth,
    amountDayInMonth,
    bookingDays,
    currentDay,
    firstDayOfTheMonthDayOfTheWeek,
    flag
  );

  return arrayOfDays;
};

export const convertMonth = (month: number) => ARRAY_MONTHS_DICTIONARY[month].value;

export const convertDate = (year: number, month: number, day: number) => {
  const dateBooking = new Date(year, month, day);
  const convertToJsonDate = new Date(dateBooking.getTime() - dateBooking.getTimezoneOffset() * 60000).toJSON();

  return convertToJsonDate;
};

export const dispatchDateOrder = (
  currentYear: number,
  currentMonth: number,
  bookingDay: number,
  dispatch: Dispatch<AnyAction>
) => {
  if (!bookingDay) return;
  const dateOrder = convertDate(currentYear, currentMonth, bookingDay);

  dispatch(actionDateOrder(dateOrder));
};

export const getDayInString = (date: string) => new Date(date).getDate();
