import React, { useEffect } from 'react';
import cn from 'classnames';
import { Button } from '../../../../components';
import { DateTime, Task } from '../../../interfaces';
import { formatMinsAndSecsForDisplay } from '../../../../utils';

import styles from './EditDateTimeForm.module.css';
import { minSecValidator, utcFormatValidator } from '../../../../utils/forms/validators';
import { Form } from 'react-router-dom';

interface EditDateTimeFormProp {
  editDateTime: DateTime;
  task: Task;
  setIsShowingEditDateTimeForm: (setIsShowing: boolean) => void;
}

const EditDateTimeForm: React.FC<EditDateTimeFormProp> = ({ editDateTime, task, setIsShowingEditDateTimeForm }) => {
  const minsAndSecs = formatMinsAndSecsForDisplay(editDateTime.time);

  return (
    <Form
      method='post'
      //@TODO: tie in the action here!
      // action={}
      className="formEditDateTime"
    >
      <h2>Edit Date Time</h2>
      <input hidden={true} name="id" value={editDateTime.id} />
      <input hidden={true} name="taskId" value={task._id} />
      <div className={styles.field}>
        {/* <Field name="date" validate={utcFormatValidator}> */}
        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input type="text" id="date" className={styles.input} />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="minutes">Minutes</label>
        <input type="text" id="minutes" className={cn(styles.input)} />
      </div>
      <Button type="submit" className={cn({ [styles.submit]: true })} value="Submit Form" />
    </Form>
  );
};

export default EditDateTimeForm;
