import { format } from 'date-fns';

export const getDate = (date) => {
    if (date === undefined) return null;
    const dtDateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
    return format(dtDateOnly, 'yyyy-MM-dd');
    
};

export const getMonthDate = (date) => {
    if (date === undefined) return null;
    
    return format(date, 'yyyy-MM');
};