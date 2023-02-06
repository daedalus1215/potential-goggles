import React from 'react';
import ms from 'pretty-ms';
import { displayMsInFractionalHourFormat } from 'utils';

const Timer = ({ time }) => {
  return (
    <div
      data-test-id="timer__display__content">
      <div >{`Hours: ${displayMsInFractionalHourFormat(time)}`}</div>
      <div>{ms(time, { secondsDecimalDigits: 2 })}</div>
    </div>
  );
};

export default Timer;
