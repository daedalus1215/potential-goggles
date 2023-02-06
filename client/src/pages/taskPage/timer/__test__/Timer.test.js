import React from 'react';
import ms from 'pretty-ms';
import { displayMsInFractionalHourFormat } from 'utils';
import { createWrapperWithContext, findByTestId } from 'testUtils';
import useUpdateCurrentTime from '../hooks/useUpdateCurrentTime';
import { useTimeContext } from '../../hooks';
import Timer from '../Timer';

jest.mock('../../hooks/useTimeContext');
jest.mock('../hooks/useUpdateCurrentTime');

describe('src/pages/createOrEditTask/timer/__test__/Timer.test.js', () => {
  describe('Timer', () => {
    // Arrange
    let wrapper;
    const isActive = false;
    const timeContext = {
      time: 20000,
    };

    const stubInitialState = [true];
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState));

    beforeEach(() => {
      useTimeContext.mockReturnValue(timeContext);
    });

    it('should display the time in the right format', () => {
      // Arrange

      // Act
      wrapper = createWrapperWithContext(<Timer />);

      // Assert
      expect(useUpdateCurrentTime).toBeCalledWith(
        timeContext.time,
        isActive,
        expect.anything(),
      );
      expect(findByTestId(wrapper, 'fractionHour').text()).toEqual(
        `Hours: ${displayMsInFractionalHourFormat(timeContext.time)}`,
      );
      expect(
        findByTestId(wrapper, 'secondDecimalDigitHour').props().value,
      ).toEqual(`${ms(timeContext.time, { secondsDecimalDigits: 2 })}`);
    });
  });
});
