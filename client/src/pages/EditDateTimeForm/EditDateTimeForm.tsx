import React, { useEffect } from 'react';
import cn from 'classnames';
import { Button, SaveButton } from '../../components';
import { DateTime, Task } from '../../interfaces';
import { formatMinsAndSecsForDisplay } from '../../utils';
import { minSecValidator, utcFormatValidator } from '../../utils/forms/validators';
import { Form, redirect, useLoaderData } from 'react-router-dom';

import styles from './EditDateTimeForm.module.css';

interface EditDateTimeFormProp {
  taskId: string,
  dateTime: DateTime
}

const EditDateTimeForm: React.FC = () => {
  const { dateTime, taskId } = useLoaderData() as EditDateTimeFormProp;

  const minsAndSecs = formatMinsAndSecsForDisplay(dateTime.time);

  if (!dateTime) {
    throw new Response("", {
      status: 404,
      statusText: "DateTime not found!",
    });
  }

  return (
    <Form
      method='post'
      className={styles.form}>
      <h2 className={styles.h2}>Edit Date Time</h2>
      <input hidden={true} name="taskId" value={taskId} readOnly />
      <input hidden={true} name="id" value={dateTime.id} readOnly />
      <input className={styles.input} type="text" name="date" defaultValue={dateTime.date} />
      <input className={styles.input} type="text" name="minutes" defaultValue={minsAndSecs} />
      <SaveButton />
    </Form>
  );
};

export default EditDateTimeForm;
