import React from 'react';
import { displayMsInFractionalHourFormat } from '../../../../utils/';
import { DateTime, Task } from '../../../interfaces';
import DateTimeListView from '../dateTimeListView/DateTimeListView';
import EditDateTimeForm from '../EditDateTimeForm/EditDateTimeForm';
import styles from './DateTimePage.module.css';

interface DateTimePageProp {
  setIsShowing: (isShowing: boolean) => void;
  task: Task
}

const DateTimePage: React.FC<DateTimePageProp> = ({ task, setIsShowing }) => {
  const [editDateTime, setEditDateTime] = React.useState({ id: '', date: '', minutes: "00:00" });
  // const { dateTimes, time } = useTaskByIdSelector();
  const millisecondsInFractionalHourFormat = displayMsInFractionalHourFormat(task.time);

  return (
    <div className={styles.childrenContent}>
      {!editDateTime?.id ? (
        <>
          <DateTimeListView dateTimes={task.dateTimes} setEditDateTime={setEditDateTime} />
          <div className={styles.dateTimeTotal}> Total: {millisecondsInFractionalHourFormat} hrs</div>
        </>
      ) : (
        <EditDateTimeForm taskId={task._id} editDateTime={editDateTime} setIsShowingEditDateTimeForm={setIsShowing} />
      )}
    </div>
  );
};

export default DateTimePage;
