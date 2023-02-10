import React from 'react';
import moment from 'moment-timezone';
import useRippleEffectById from '../../../../components/button/useRippleEffect/useRippleEffectById';
import styles from './DateTimeListView.module.css';
import { DateTime } from '../../../interfaces';

const myTimezone = 'America/New_York';
const myDatetimeFormat = 'YYYY-MM-DD hh:mm:ss a';

interface DateTimeItemInterface {
  dateTime: DateTime;
  setEditDateTime: (dateTime: DateTime) => void;
}

const DateTimeItem: React.FC<DateTimeItemInterface> = ({ dateTime, setEditDateTime }) => {
  const { id, date, time } = dateTime;

  const myDatetimeString = moment(date).tz(myTimezone).format(myDatetimeFormat);

  const onClick = () => setEditDateTime({ id, date, time });
  const rippleClick = useRippleEffectById(dateTime.id, onClick);

  const key = dateTime.id + dateTime.time;
  
  return (
    <div
      id={dateTime.id}
      className={styles.content}
      key={key}
      onClick={rippleClick}
      data-testid="DateTimeItem">
      <input type="hidden" value={dateTime.id} name="id" />
      <div className={styles.date}>Date: {myDatetimeString}</div>
      <div className={styles.time}>Mins: {dateTime.time}</div>
    </div>
  );
};

export default DateTimeItem;
