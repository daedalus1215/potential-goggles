import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

// target
import useSubmit from '../useSubmit';

// dependencies
import { putDateTime } from 'redux/actionCreators/actions';
jest.mock('redux/actionCreators/actions');

jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn()
}));

describe('useSubmit.test.js', () => {
    it('returns submit', () => {
        // Arrange
        const dateTime = {
            id: 'dateTimeId',
            date: 'date',
            minutes: 1234
        };
        const taskId = 'taskId';
        const setIsShowingEditDateTimeFormSpy = jest.fn().mockImplementation();
        const expected = {
            body: dateTime,
            taskId,
            dateTimeId: dateTime.id,
        }

        // Act
        const { result } = renderHook(() => useSubmit(taskId, setIsShowingEditDateTimeFormSpy));
        act(() => result.current({ ...dateTime }));

        // Assert
        expect(putDateTime).toBeCalledWith(expected);
        expect(setIsShowingEditDateTimeFormSpy).toBeCalledWith(false);
    });
});