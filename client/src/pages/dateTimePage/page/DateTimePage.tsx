import React from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { displayMsInFractionalHourFormat, getCurrentDateTimeEstFormat } from '../../../utils';
import { Task } from '../../../interfaces';
import DateTimeListView from '../dateTimeListView/DateTimeListView';
import styles from './DateTimePage.module.css';
import { SaveButton } from '../../../components';
import AddButton from '../../../components/addButton/AddButton';

const DateTimePage: React.FC = () => {
  const task = useLoaderData() as Task;

  if (!task) {
    throw new Response("", {
      status: 404,
      statusText: "Task not found!",
    });
  }

  const millisecondsInFractionalHourFormat = displayMsInFractionalHourFormat(task.time);
  return (<div className={styles.page}>
    <Form
      // action={`/date-time/${task._id}`}
      method='post'>
      <input type="hidden" name="taskId" value={task._id} />
      <input type="hidden" name="date" value={getCurrentDateTimeEstFormat()} />
      <input type="hidden" name="minutes" value='00:00' />
      <input type="hidden" name="id" value='' />
      <AddButton />
    </Form>
    <div className={styles.childrenContent}>
      <DateTimeListView task={task} />
    </div>
  </div>
  );
};

export default DateTimePage;
