import { format } from 'date-fns';
import moment from 'moment-timezone';

const myTimezone = 'America/New_York';
const myDatetimeFormat = 'YYYY-MM-DD hh:mm:ss a';
const myDatetimeFormat2 = 'YYYY-MM-DD';
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

export const getDateMoment = (date) => {
    return moment(date)
        .tz(myTimezone)
        .format(myDatetimeFormat);
};

export const getMonthDate = (date) => {
    if (date === undefined) return null;

    return format(date, 'yyyy-MM');
};

export const getMonthDateMoment = (date) => {
    if (date === undefined) return null;

    return formatMonth(getMonthDate(date))
};

