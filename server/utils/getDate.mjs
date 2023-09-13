import { format } from 'date-fns';
import moment from 'moment-timezone';

const myTimezone = 'America/New_York';
const myDatetimeFormat = 'YYYY-MM-DD hh:mm:ss a';
const myDatetimeFormat2 = 'YYYY-MM-DD';

export const getDate = (date) => {
    if (date === undefined) return null;
    const dtDateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
    return format(dtDateOnly, 'yyyy-MM-dd');
};

export const formatDate = (date) => {
    if (date === undefined) return null;
    return format(date, 'yyyy-MM-dd')
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

    return moment(date)
        .tz(myTimezone)
        .format(myDatetimeFormat2);
};

