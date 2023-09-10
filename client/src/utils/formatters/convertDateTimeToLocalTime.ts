/**
 * @TODO: rename
 * @param date 
 * @returns 
 */
export default function convertDateTimeToLocalTime(date: Date): Date {
  const dtDateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
  return dtDateOnly;
}
