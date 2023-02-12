import React from 'react';
import { DateTime, Task } from '../../../interfaces';
import DateTimeItem from './DateTimeItem';
import styles from './DateTimeListView.module.css';

interface DateTimeListViewProp {
  task: Task
}

const DateTimeListView: React.FC<DateTimeListViewProp> = ({ task }) => {
  return (
    <div className={styles.grid}>
      {task.dateTimes?.map((dateTime) => <DateTimeItem
        dateTime={dateTime}
        taskId={task._id}
        key={dateTime.id + dateTime.time}
      />
      )}
    </div>
  );
};

export default DateTimeListView;
