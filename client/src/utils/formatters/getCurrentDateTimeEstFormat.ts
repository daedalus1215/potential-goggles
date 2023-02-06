import moment from 'moment-timezone';

export const myTimezone = 'America/New_York';
export const myDatetimeFormat = 'YYYY-MM-DDThh:mm:ss';

export default function getCurrentDateTimeEstFormat(): string  {
  return moment.tz(new Date(), myTimezone).format(myDatetimeFormat);
}
