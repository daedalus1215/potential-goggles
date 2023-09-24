import React from 'react';
import { render } from '@testing-library/react';
import DownloadButton from '../DownloadButton';

describe('src/pages/tasks/TaskListView/__test__/DownloadButton.test.js', () => {
    describe('DownloadButton', () => {
        it('should render the button when tasks are available', () => {
            // Arrange
            const tasks = [{ _id: '1', }, { _id: 'yup' }];

            // Act
            const { queryByTestId } = render(<DownloadButton tasks={tasks} />);

            // Assert
            expect(queryByTestId('btn-download')).toBeInTheDocument();
            expect(queryByTestId('btn-download')).toMatchSnapshot();
        });

        it('should not render the button when tasks are not available', () => {
            // Arrange
            const tasks = [];

            // Act
            const { queryByTestId } = render(<DownloadButton tasks={tasks} />);

            // Assert
            expect(queryByTestId('btn-delete')).not.toBeInTheDocument();
        });
    });
});