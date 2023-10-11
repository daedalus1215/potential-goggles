import { SIXTY, THOUSAND } from "../constants";

type convertDateTimeToLocalTimeType = (date: Date) => Date;

const convertDateTimeToLocalTime: convertDateTimeToLocalTimeType = (date) =>
  new Date(date.valueOf() + date.getTimezoneOffset() * SIXTY * THOUSAND)

export default convertDateTimeToLocalTime;
