import React from "react";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// import target
import DateTimePage from '../DateTimePage';

// import target dependencies
import useFetchTaskByIdDispatch from "pages/tasks/TaskForm/hooks/useFetchTaskById/useFetchTaskByIdDispatch";
import useTaskByIdSelector from 'redux/selectors/useTaskByIdSelector';

// mock hooks
jest.mock("pages/tasks/TaskForm/hooks/useFetchTaskById/useFetchTaskByIdDispatch");
jest.mock('redux/selectors/useTaskByIdSelector');

// mock components
jest.mock('../../dateTimeListView/DateTimeListView', () => {
    return () => <div className="DateTimeListView">DateTimeListView</div>
});
jest.mock('../../EditDateTimeForm/EditDateTimeForm', () => {
    return () => <div className="EditDateTimeForm">EditDateTimeForm</div>
});

describe('DateTimePage.test.js', () => {
    it('should show EditDateTimeForm, when editDateTime with id is available', async () => {
        // Arrange
        const taskId = 'taskId';
        const setIsShowingSpy = jest.fn().mockImplementation();
        useTaskByIdSelector.mockReturnValue({
            dateTimes: [{ id: 'dateTimeID' }],
            time: 10000,
        });

        // Act
        const { queryAllByText, findByText}  = render(<DateTimePage taskId={taskId} setIsShowing={setIsShowingSpy} />);

        // Assert
        expect(useFetchTaskByIdDispatch).toBeCalledWith(taskId);
        expect(await findByText('DateTimeListView')).toBeInTheDocument();
        expect(queryAllByText('EditDateTimeForm')).toEqual([]);
    });

    it('should show DateTimeListView, when no editDateTime with id', async () => {
        // Arrange
        const taskId = 'taskId';
        const setIsShowingSpy = jest.fn().mockImplementation();
        useTaskByIdSelector.mockReturnValue({
            dateTimes: [{ id: 'dateTimeID' }],
            time: 10000,
        });
        const realUseState = React.useState;
        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => realUseState(() => { return { id: 'yes' } }));

        // Act
        const { queryAllByText, findByText } = render(<DateTimePage taskId={taskId} setIsShowing={setIsShowingSpy} />);

        // Assert
        expect(useFetchTaskByIdDispatch).toBeCalledWith(taskId);
        expect(await findByText('EditDateTimeForm')).toBeInTheDocument();
        expect(queryAllByText('DateTimeListView')).toEqual([]);
    });
});