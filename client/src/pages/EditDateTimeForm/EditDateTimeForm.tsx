import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { Button, SaveButton, TopBar } from '@/components';
import { DateTime, Task } from '../../interfaces';
import { formatMinsAndSecsForDisplay } from '../../utils';
import { minSecValidator, utcFormatValidator } from '../../utils/forms/validators';
import { Form, redirect, useLoaderData } from 'react-router-dom';

import styles from './EditDateTimeForm.module.css';
import { ExpandedContext } from '@/contexts/ExpandedContext';
import BackButton from '@/components/BackButton';
import stripSecondsAway from '@/utils/formatters/stripSecondsAway';

interface EditDateTimeFormProp {
  taskId: string,
  dateTime: DateTime
}

const EditDateTimeForm: React.FC = () => {
  const { dateTime, taskId } = useLoaderData() as EditDateTimeFormProp;
  const { isExpanded } = useContext(ExpandedContext);
  const minsAndSecs = stripSecondsAway(dateTime.time);

  if (!dateTime) {
    throw new Response("", {
      status: 404,
      statusText: "DateTime not found!",
    });
  }

  return (
    <>
      <TopBar>
        <>
          <BackButton path={`/date-time/${taskId}`} />
        </>
      </TopBar>

      <div className={styles.editDateTimeForm}>
        <Form
          method='post'
          className={cn(styles.form, { [styles.notExpanded]: !isExpanded })}>
          <h2 className={styles.h2}>Edit Date Time</h2>
          <input hidden={true} name="taskId" value={taskId} readOnly />
          <input hidden={true} name="id" value={dateTime.id} readOnly />
          <input className={styles.input} pattern="\d{4}-[0-1]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-6]\d.\d{3}[A-Z]" type="text" name="date" defaultValue={dateTime.date} />
          <input className={styles.input} type="number" name="minutes" defaultValue={minsAndSecs} autoFocus={true}/>
          <SaveButton />
        </Form>
      </div>
    </>
  );
};

export default EditDateTimeForm;
