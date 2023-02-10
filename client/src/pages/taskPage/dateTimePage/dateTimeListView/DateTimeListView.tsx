import React from 'react';
import { DateTime } from '../../../interfaces';
import DateTimeItem from './DateTimeItem';
import styles from './DateTimeListView.module.css';

interface DateTimeListViewProp {
  dateTimes: DateTime[];
  setEditDateTime: (dateTime: DateTime) => void;
}

const DateTimeListView: React.FC<DateTimeListViewProp> = ({ dateTimes, setEditDateTime }) => {
  return (
    <div className={styles.grid}>
      {dateTimes?.map((dT) => {
        return <DateTimeItem dateTime={dT} key={dT.id + dT.time} setEditDateTime={setEditDateTime} />;
      })}
    </div>
  );
};

export default DateTimeListView;
