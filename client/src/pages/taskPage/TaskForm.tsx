/* eslint-disable no-useless-computed-key */
import React from 'react';
import { useLoaderData } from 'react-router-dom';
// import TagMultiSelect from 'pages/tasks/TaskForm/tagMultiSelect/TagMultiSelect';
// import Timer from 'pages/tasks/TaskForm/timer/Timer';
import TextAreaAdapter from '../../components/textAreaAdapter/TextAreaAdapter';
// import { Dropdown, TopBar, SaveButton } from 'components';

import styles from './TaskForm.module.css';

const FORM_ID = "taskForm";

const TaskForm = () => {
  const task = useLoaderData();
  // const tags = useTagsToOptions();
  // const task = useTaskByIdSelector();
  // const projectOptions = useFetchProjectOptions();
  // const onSubmit = useSubmit();
  // useListenForSave(FORM_ID);

  return (<div
    data-testid="addTaskForm">
    {/* <TopBar>
      <SaveButton name={FORM_ID} />
      <DateTimeButton taskId={taskId} />
      <Timer />
    </TopBar> */}
    <form>
      <TextAreaAdapter />
    </form>
  </div>);
};

export default TaskForm;
