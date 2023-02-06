import React, { useEffect } from 'react';
import cn from 'classnames';
import { Field, Form } from 'react-final-form';
import { minSecValidator, utcFormatValidator } from 'forms/validators';
import { Button } from 'components';
import useSubmit from './useSubmit';
import { EditDateTimeInterface } from 'interfaces/pages/tasks/Task';
import formatMinsAndSecsForDisplay from 'utils/formatters/formatMinsAndSecsForDisplay';
import styles from './EditDateTimeForm.module.css';
interface EditDateTimeFormProp {
  editDateTime: EditDateTimeInterface;
  taskId: string;
  setIsShowingEditDateTimeForm: (setIsShowing: boolean) => void;
}

const EditDateTimeForm: React.FC<EditDateTimeFormProp> = ({ editDateTime, taskId, setIsShowingEditDateTimeForm }) => {
  const onSubmit = useSubmit(taskId, setIsShowingEditDateTimeForm);
  const minsAndSecs = formatMinsAndSecsForDisplay(editDateTime.minutes);
  //@TODO: Replace with new info
  // const { setInfoFlashMessage } = useFlashMessageContext();
  
  useEffect(() => {
    // setInfoFlashMessage('Save note before adjusting time, might lose notes.');
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ ...editDateTime, minutes: minsAndSecs }}
      render={({ handleSubmit, submitting, pristine }) => {
        return (
          <form className={styles.form} data-testid="form" onSubmit={handleSubmit} method="PUT">
            <h2>Edit Date Time</h2>
            <Field type="hidden" name="id" value={editDateTime.id} component="input" />
            <div className={styles.field}>
              <Field name="date" validate={utcFormatValidator}>
                {({ input, meta }) => {
                  return (
                    <div className={styles.field}>
                      <label htmlFor="date">Date</label>
                      <input {...input} type="text" id="date" className={styles.input} />
                      {meta.error && meta.touched && (
                        <div className={styles.errorContainer}>
                          <span className={cn('iconError', 'glyphicon glyphicon-info-sign')} /> <span className={styles.error}>{meta.error}</span>
                        </div>
                      )}
                    </div>
                  );
                }}
              </Field>
            </div>
            <Field name="minutes" validate={minSecValidator}>
              {({ input, meta }) => {
                return (
                  <div className={styles.field}>
                    <label htmlFor="minutes">Minutes</label>
                    <input {...input} type="text" id="minutes" className={cn(styles.input, { [styles.errorBorder]: meta.error && meta.touched })} />
                    {meta.error && meta.touched && (
                      <div className={styles.errorContainer}>
                        <span className={cn('iconError', 'glyphicon glyphicon-info-sign')} /> <span className={styles.error}>{meta.error}</span>
                      </div>
                    )}
                  </div>
                );
              }}
            </Field>
            <Button type="submit" className={cn({ [styles.submit]: true })} value="Submit Form" disabled={submitting || pristine} />
          </form>
        );
      }}
    />
  );
};

export default EditDateTimeForm;
