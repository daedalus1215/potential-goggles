import * as React from 'react';
import { render } from '@testing-library/react';
import UploadButton from '../UploadButton';

describe('src/pages/tasks/TaskListView/ControlButtons/UploadButton/__test__/UploadButton.test.js', () => {
    describe('UploadButton', () => {
        it('should display the button', () => {
            // Arrange
            const useStateMock = jest.spyOn(React, 'useState');
            useStateMock.mockReturnValueOnce([false, jest.fn()]);
            // Act
            const target = render(<UploadButton />);

            // Assert
            expect(target.getByRole("button")).toBeTruthy();
        });
    });
});