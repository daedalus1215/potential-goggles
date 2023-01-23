/* eslint-disable no-useless-computed-key */
import React, { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
// import TagMultiSelect from 'pages/tasks/TaskForm/tagMultiSelect/TagMultiSelect';
// import Timer from 'pages/tasks/TaskForm/timer/Timer';
import TextAreaAdapter from '../../components/textAreaAdapter/TextAreaAdapter';
import useListenForSave from './useListenForSave';
// import { Dropdown, TopBar, SaveButton } from 'components';

import styles from './TaskForm.module.css';

const FORM_ID = "taskForm";

const TaskForm = () => {
  const { items: task } = useLoaderData();
  const [description, setDescription] = useState(task.description);
  // const tags = useTagsToOptions();
  // const task = useTaskByIdSelector();
  // const projectOptions = useFetchProjectOptions();
  // const onSubmit = useSubmit();
  useListenForSave(FORM_ID);

  return (<div
    data-testid="addTaskForm">
    {/* <TopBar>
      <SaveButton name={FORM_ID} />
      <DateTimeButton taskId={taskId} />
      <Timer />
    </TopBar> */}
    <Form id={FORM_ID} name={FORM_ID} method="put">
      <TextAreaAdapter value={description} onChange={setDescription} />
      <button type='submit'/>
    </Form>
  </div>);
};

export default TaskForm;
