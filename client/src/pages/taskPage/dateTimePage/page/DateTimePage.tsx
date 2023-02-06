import React from 'react';
import { displayMsInFractionalHourFormat } from 'utils';
import DateTimeListView from '../dateTimeListView/DateTimeListView';
import EditDateTimeForm from '../EditDateTimeForm/EditDateTimeForm';
import styles from './DateTimePage.module.css';

interface DateTimePageProp {
  taskId: string;
  setIsShowing: (isShowing: boolean) => void;
}

const DateTimePage: React.FC<DateTimePageProp> = ({ taskId, setIsShowing }) => {
  const [editDateTime, setEditDateTime] = React.useState({ id: '', date: '', minutes: "00:00" });
  // const { dateTimes, time } = useTaskByIdSelector();
  const millisecondsInFractionalHourFormat = displayMsInFractionalHourFormat(time);

  return (
    <div className={styles.childrenContent}>
      {!editDateTime?.id ? (
        <>
          <DateTimeListView dateTimes={dateTimes} setEditDateTime={setEditDateTime} />
          <div className={styles.dateTimeTotal}> Total: {millisecondsInFractionalHourFormat} hrs</div>
        </>
      ) : (
        <EditDateTimeForm taskId={taskId} editDateTime={editDateTime} setIsShowingEditDateTimeForm={setIsShowing} />
      )}
    </div>
  );
};

export default DateTimePage;
