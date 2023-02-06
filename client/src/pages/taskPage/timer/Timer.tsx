/* eslint-disable no-useless-computed-key */
import React, { useState, useCallback, useEffect } from 'react';
import ms from 'pretty-ms';
import useUpdateCurrentTime from './hooks/useUpdateCurrentTime';
import TimerButtons from './timerButtons/TimerButtons';
import styles from './Timer.module.css';

const Timer = ({ task }) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(task.time);
  const setTimeCallback = useCallback((times:number) => setTime(times), [setTime]);
  useUpdateCurrentTime(time, isActive, setTimeCallback);
  const msTime = (time && ms(time, { secondsDecimalDigits: 2 })) ?? 0;

  const original = (task?.time && ms(task.time, { secondsDecimalDigits: 2 })) ?? 0
  return <TimerButtons
    time={time}
    setTime={setTimeCallback}
    isActive={isActive}
    setIsActive={setIsActive}
  >
    <div data-test-id="timer__display__content">
      {/* <div>{task.time}</div> */}
      <div data-test-id="fractionHour">{`Hours: ${original}`}</div>
      <input
        data-test-id="secondDecimalDigitHour"
        className={styles.input}
        value={msTime}
        readOnly
      />
    </div>
  </TimerButtons>
};

export default Timer;
