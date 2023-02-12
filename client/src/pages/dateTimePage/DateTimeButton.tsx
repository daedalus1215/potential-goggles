/* eslint-disable no-useless-computed-key */
import React, { useState } from 'react';
import cn from 'classnames';
import { Modal, Button } from '../../components';
import DateTimePage from './page/DateTimePage';
import styles from './DateTimeButton.module.css';
import { Task } from '../../interfaces';

interface DateTimeButtonProp {
  task: Task;
}

const DateTimeButton: React.FC<DateTimeButtonProp> = ({ task }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className={cn(styles.outline)}>
      <Button className={cn(styles.dateTimeButton, 'bi bi-clock')} onClick={() => setIsShowing(!isShowing)} />

      {isShowing ? (
        <Modal setIsShowing={setIsShowing}>
          <DateTimePage task={task} setIsShowing={setIsShowing} />
        </Modal>
      ) : (
        []
      )}
    </div>
  );
};

export default DateTimeButton;
