import React from 'react';
import classNames from 'classnames';
import { Task } from '@/interfaces';
import DateTimeItem from './DateTimeItem';
import useExpandedContext from '@/hooks/useExpandedContext';

import styles from './DateTimeListView.module.css';

interface DateTimeListViewProp {
  task: Task
}

export const DateTimeListView: React.FC<DateTimeListViewProp> = ({ task }) => {
  const { isExpanded } = useExpandedContext();
  console.log('task', task)
  return (
    <div className={classNames(styles.grid, { [styles.isExpanded]: isExpanded })}>
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
