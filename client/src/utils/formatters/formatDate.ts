import { format } from 'date-fns';

const dateRegExp = /\d{4}-\d{2}-\d{2}/;

export const getDate = (date: Date): string | null => {
    if (!date) return null;
    const dtDateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
    return format(dtDateOnly, 'yyyy-MM-dd');
};

export const formatDate = (date?: Date): string | null => {
    if (date === undefined || date === null) return null;
    const dateFormat = format(date, 'yyyy-MM-dd').match(dateRegExp);
    return dateFormat ? dateFormat[0] : null;
}