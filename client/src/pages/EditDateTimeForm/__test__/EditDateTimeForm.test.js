import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// target
import EditDateTimeForm from '../EditDateTimeForm';

// dependencies
// useSubmit
jest.mock('../useSubmit', () => {
    return () => jest.fn() //@TODO: Left off here.
});

jest.mock('utils/formatters/formatMinsAndSecsForDisplay', () => {
    return () => 1111;
});

jest.mock('react-final-form', () => ({
    Form: () => <div id="editDateTimeForm">editDateTimeForm</div>
}));

describe('src/pages/tasks/TaskForm/dateTimeDetail/EditDateTimeForm/__test__/EditDateTimeForm.test.js', () => {
    describe('EditDateTimeForm', () => {
        it('should render', () => {
            // Arrange
            const editDateTime = {
                minutes: 100,
                date: 'date',
                id: 'editDateTimeID'
            };
            const taskId = 'taskId';
            const setIsShowingEditDateTimeFormSpy = jest.fn();

            // Act
            const target = render(<EditDateTimeForm
                editDateTime={editDateTime}
                taskId={taskId}
                setIsShowingEditDateTimeForm={setIsShowingEditDateTimeFormSpy} />);

            // Assert
            expect(target.getByText('editDateTimeForm')).toHaveTextContent([]);
        })
    });
});