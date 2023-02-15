import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { displayMsInFractionalHourFormat } from '../../../utils';
import { Task } from '../../../interfaces';
import DateTimeListView from '../dateTimeListView/DateTimeListView';
import styles from './DateTimePage.module.css';

const DateTimePage: React.FC = () => {
  const task = useLoaderData() as Task;

  if (!task) {
    throw new Response("", {
      status: 404,
      statusText: "Task not found!",
    });
  }

  const millisecondsInFractionalHourFormat = displayMsInFractionalHourFormat(task.time);
  return (<>
  
  <div className={styles.childrenContent}>
      <DateTimeListView task={task} />
    </div>
    </>
  );
};

export default DateTimePage;
