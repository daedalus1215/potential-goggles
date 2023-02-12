import React, { useEffect } from 'react';
import cn from 'classnames';
import { Button, SaveButton } from '../../components';
import { DateTime, Task } from '../../interfaces';
import { formatMinsAndSecsForDisplay } from '../../utils';
import { minSecValidator, utcFormatValidator } from '../../utils/forms/validators';
import { Form, useLoaderData } from 'react-router-dom';

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
      //@TODO: tie in the action here!
      action={`/task/${dateTime.id}`}
      className={styles.form}
    >
      <h2 className={styles.h2}>Edit Date Time</h2>
      <input hidden={true} name="formId" value="DateTimeForm" />
      <input hidden={true} name="id" value={dateTime.id} />

      {/* <label htmlFor="date">Date</label> */}
      <input className={styles.input} type="text" id="date" defaultValue={dateTime.date}/>

      {/* <label htmlFor="minutes">Minutes</label> */}
      <input className={styles.input} type="text" id="minutes" defaultValue={minsAndSecs}/>
      <SaveButton />  
    </Form>
  );
};

export default EditDateTimeForm;
