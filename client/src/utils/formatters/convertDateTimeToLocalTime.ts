type convertDateTimeToLocalTimeType = (date: Date) => Date;

export const SIXTY = 60;
export const THOUSAND = 1000;

const convertDateTimeToLocalTime: convertDateTimeToLocalTimeType = (date) =>
  new Date(date.valueOf() + date.getTimezoneOffset() * SIXTY * THOUSAND)

export default convertDateTimeToLocalTime;
