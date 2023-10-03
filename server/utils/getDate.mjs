import { addDays, differenceInDays, format, subDays } from 'date-fns';

const dateRegExp = /\d{4}-\d{2}-\d{2}/;
const monthRegExp = /\d{4}-\d{2}/;

export const parseDate = (date) => {
    if (!date) return null;
    return getDate(date).match(dateRegExp)[0]
}
export const getDate = (date) => {
    if (!date) return null;
    const dtDateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
    return format(dtDateOnly, 'yyyy-MM-dd');
};

export const formatDate = (date) => {
    if (date === undefined) return null;
    return format(date, 'yyyy-MM-dd').match(dateRegExp)[0];
}

export const formatMonth = (date) => {
    if (date === undefined) return null;
    return format(date, 'yyyy-MM-dd').match(monthRegExp)[0];
}

export const getMonthDate = (date) => {
    if (date === undefined) return null;
    return format(date, 'yyyy-MM');
};

export const compareFormattedDate = (date, day) => {
    return formatDate(date) === day
}
/**
 * First date is the one we are checking if it is even or greater than.
 * @param {Date | String} date1 either a Date or a String in the format "yyyy-MM-DD"
 * @param {Date | String} date2 either a Date or a String in the format "yyyy-MM-DD"
 * @returns 
 */
export const isEvenOrGreaterThan = (date1, date2) => {
    const firstDate = date1 instanceof Date ? formatDate(date1) : date1;
    const secondDate = date2 instanceof Date ? formatDate(date2) : date2;
    return differenceInDays(new Date(firstDate), new Date(secondDate)) >= 0;
};

/**
 * 
 * @param {Date} date 
 * @returns 
 */
export const getDatesOfPastWeek = (date) => {
    const dates = [];
    dates.push(formatDate(date));
    let tDate = date;
    for (let i = 0; i < 6; i++) {
        tDate = subDays(tDate, 1);
        dates.push(formatDate(tDate))
    }
    return dates;
};

/**
 * 
 * @param String currentDate format yyyy-MM-dd
 * @returns Date
 */
export const getDateInISOFormat = (currentDate) => (!!currentDate && currentDate != "null")
    ? new Date(currentDate)
    : new Date();