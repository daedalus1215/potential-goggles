import React from 'react';
import classNames from 'classnames';
import { ProperTask } from '@/interfaces';
import DateTimeItem from './DateTimeItem';
import useExpandedContext from '@/hooks/useExpandedContext';

import styles from './DateTimeListView.module.css';

interface DateTimeListViewProp {
  task: ProperTask
}

export const DateTimeListView: React.FC<DateTimeListViewProp> = ({ task }) => {
  const { isExpanded } = useExpandedContext();
  return (
    <div className={classNames(styles.grid, { [styles.isExpanded]: isExpanded })}>
      {task.dateTimes?.map((dateTime) => <DateTimeItem
        dateTime={dateTime}
        taskId={task.taskId}
        key={dateTime.id + dateTime.time}
      />
      )}
    </div>
  );
};

export default DateTimeListView;
