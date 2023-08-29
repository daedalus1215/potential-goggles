import React from 'react';
import moment from 'moment-timezone';
import useRippleEffectById from '../../../components/button/useRippleEffect/useRippleEffectById';
import styles from './DateTimeListView.module.css';
import { DateTime } from '../../../interfaces';
import { Link } from 'react-router-dom';

const myTimezone = 'America/New_York';
const myDatetimeFormat = 'YYYY-MM-DD hh:mm:ss a';

interface DateTimeItemInterface {
  dateTime: DateTime;
  taskId: string;
}

const DateTimeItem: React.FC<DateTimeItemInterface> = ({ dateTime, taskId }) => {

  const myDatetimeString = moment(dateTime.date)
    .tz(myTimezone)
    .format(myDatetimeFormat);

  const rippleClick = useRippleEffectById(dateTime.id, () => {});

  const key = dateTime.id + dateTime.time;

  return (
    <Link
      to={`/task/${taskId}/date-time/edit/${dateTime.id}`}
      id={dateTime.id}
      className={styles.content}
      key={key}
      onClick={rippleClick}
      data-testid="DateTimeItem">
      <input type="hidden" value={dateTime.id} name="id" />
      <div className={styles.date}>{myDatetimeString}</div>
      <div className={styles.time}>{dateTime.time}</div>
    </Link>
  );
};

export default DateTimeItem;
