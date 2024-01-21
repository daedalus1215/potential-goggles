import React from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { ProperTask } from '@/interfaces';
import { TopBar, BackButton, AddButton } from '@/components';
import DateTimeListView from '../dateTimeListView/DateTimeListView';

import styles from './DateTimePage.module.css';

const DateTimePage: React.FC = () => {
  const task = useLoaderData() as ProperTask;

  if (!task) {
    throw new Response("", {
      status: 404,
      statusText: "Task not found!",
    });
  }
  return (<div className='contactRight'>
    <div className={styles.header}>
      <h2 className={styles.h2}>{task.title}</h2>
      <TopBar>
        <>
          <BackButton path={`/task/${task.taskId}`} />
          <Form
            method='post'>
            <input type="hidden" name="taskId" value={task.taskId} />
            <AddButton />
          </Form>
        </>
      </TopBar>
    </div>
    <div className={styles.childrenContent}>
      <DateTimeListView task={task} />
    </div>
  </div>);
};

export default DateTimePage;
