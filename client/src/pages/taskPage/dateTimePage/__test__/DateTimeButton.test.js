import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// target
import DateTimeButton from '../DateTimeButton';

// dependencies
jest.mock('components/modal/Modal', () => {
    return () => <div className="modalContent">modalContent</div>
});

describe('src/pages/tasks/TaskForm/dateTimeDetail/__test__/DateTimeButton.test.js', () => {
    // Arrange
    const taskId = 'theTaskId';
    const dateTimes = [
        { date: '2020-10-29T03:25:30.167+00:00', time: '100', id: 'uniqueKey' }
    ];

    it('render button, but no DateTimePage', () => {
        // Arrange

        // Act
        const target = render(<DateTimeButton dateTimes={dateTimes} taskId={taskId} />);

        // Assert
        expect(screen.getByRole("button")).toBeTruthy();
        expect(target.container.querySelector('.modalContent')).toBeFalsy();
    });

    describe("onClick", () => {
        it('should show DateTimePage', async () => {
            // Arrange
            const realUseState = React.useState;
            jest.spyOn(React, 'useState')
                .mockImplementationOnce(() => realUseState([]));
            const taskId = 'theTaskId';

            // Act
            const { findByText } = render(<DateTimeButton dateTimes={dateTimes} taskId={taskId} />);
            fireEvent.click(screen.getByRole('button'));

            // Assert
            expect(await findByText('modalContent')).toBeInTheDocument()
        });
    });
});