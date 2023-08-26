import React, { useContext } from 'react';
import classNames from 'classnames';
import { Task } from '@/interfaces';
import { ExpandedContext } from '@/contexts/ExpandedContext';
import DateTimeItem from './DateTimeItem';

import styles from './DateTimeListView.module.css';

interface DateTimeListViewProp {
  task: Task
}

const DateTimeListView: React.FC<DateTimeListViewProp> = ({ task }) => {
  const { isExpanded } = useContext(ExpandedContext);

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
