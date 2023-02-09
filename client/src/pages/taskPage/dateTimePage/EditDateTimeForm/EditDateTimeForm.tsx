import React, { useEffect } from 'react';
import cn from 'classnames';
import { Button } from '../../../../components';
import { DateTime } from '../../../interfaces';
import { formatMinsAndSecsForDisplay } from '../../../../utils';

import styles from './EditDateTimeForm.module.css';
import { minSecValidator, utcFormatValidator } from '../../../../utils/forms/validators';
import { Form } from 'react-router-dom';

interface EditDateTimeFormProp {
  editDateTime: DateTime;
  taskId: string;
  setIsShowingEditDateTimeForm: (setIsShowing: boolean) => void;
}

const EditDateTimeForm: React.FC<EditDateTimeFormProp> = ({ editDateTime, taskId, setIsShowingEditDateTimeForm }) => {
  const minsAndSecs = formatMinsAndSecsForDisplay(editDateTime.time);
  //@TODO: Replace with new info
  // const { setInfoFlashMessage } = useFlashMessageContext();

  useEffect(() => {
    // setInfoFlashMessage('Save note before adjusting time, might lose notes.');
  }, []);

  // @TODO: might need an action on this form.
  return (
    <Form method='post'>
      <h2>Edit Date Time</h2>
      <input hidden={true} name="id" value={editDateTime.id} />
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
