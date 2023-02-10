import React from 'react';
import { displayMsInFractionalHourFormat } from '../../../../utils/';
import { Task } from '../../../interfaces';
import DateTimeListView from '../dateTimeListView/DateTimeListView';
import EditDateTimeForm from '../EditDateTimeForm/EditDateTimeForm';
import styles from './DateTimePage.module.css';

interface DateTimePageProp {
  setIsShowing: (isShowing: boolean) => void;
  task: Task;
}

const DateTimePage: React.FC<DateTimePageProp> = ({ task, setIsShowing }) => {
  const [editDateTime, setEditDateTime] = React.useState({ id: '', date: '', time: "00:00" });
  const millisecondsInFractionalHourFormat = displayMsInFractionalHourFormat(task.time);

  return (
    <div className={styles.childrenContent}>
      {!editDateTime?.id ? (
        <>
          <DateTimeListView dateTimes={task.dateTimes} setEditDateTime={setEditDateTime} />
          <div className={styles.dateTimeTotal}> Total: {millisecondsInFractionalHourFormat} hrs</div>
        </>
      ) : (
        <EditDateTimeForm task={task} editDateTime={editDateTime} setIsShowingEditDateTimeForm={setIsShowing} />
      )}
    </div>
  );
};

export default DateTimePage;
