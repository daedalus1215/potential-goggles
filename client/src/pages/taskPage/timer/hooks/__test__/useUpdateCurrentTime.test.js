import { renderHook, act } from '@testing-library/react-hooks';
import useUpdateCurrentTime from '../useUpdateCurrentTime';

describe('src/hooks/__test__/useUpdateCurrentTime.test.js', () => {
  describe('#useUpdateCurrentTime', () => {
    // Mock the clearInterval the browser provides us.
    global.clearInterval = jest.fn();
    const setTimeSpy = jest.fn();

    beforeEach(() => {
      setTimeSpy.mockClear();
      global.clearInterval.mockClear();
    });

    describe('isActive is false', () => {
      it(
        "should invoke 'clearInterval' wih undefined and 'setTimeSpy' will not be invoked, " +
          "when 'time' is anything but 0",
        () => {
          renderHook(() => useUpdateCurrentTime(1, false, setTimeSpy));

          expect(clearInterval).toBeCalledWith(undefined);
          expect(setTimeSpy).not.toBeCalled();
        },
      );

      it("should not invoke 'clearInterval' and 'setTimeSpy', when 'time' is 0", () => {
        renderHook(() => useUpdateCurrentTime(0, false, setTimeSpy));

        expect(clearInterval).not.toBeCalled();
        expect(setTimeSpy).not.toBeCalled();
      });
    });

    describe('isActive is true', () => {
      it("should call 'setTime'", () => {
        const currentTime = Date.now();
        const expectedTime = currentTime - 1000;
        // Mock the setInterval the browser provides us.
        global.setInterval = jest
          .fn()
          .mockImplementation(() => setTimeSpy(expectedTime));

        const { result } = renderHook(() =>
          useUpdateCurrentTime(1000, true, setTimeSpy),
        );

        expect(global.setInterval).toBeCalled();
        expect(setTimeSpy).toBeCalledWith(expectedTime);
      });
    });
  });
});
