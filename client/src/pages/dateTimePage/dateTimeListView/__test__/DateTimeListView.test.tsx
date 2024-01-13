// TSX Test boilerplate
import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

// target
import DateTimeListView from '../DateTimeListView';
import { taskFixture } from '@/dataFixtures/taskFixture';

// mocks
jest.mock('../DateTimeItem', () => ({
    default: () => <div data-testid="DateTimeItem">DateTimeItem</div>
}));
jest.mock('@/hooks/useExpandedContext', () => ({
    default: () => ({ isExpanded: false })
}));

describe('DateTimeListView.test.tsx', () => {
    it('should render with DateTimeItem', () => {
        // Arrange & Act
        //@TODO: Left off here. Need to fix the disconnect between task's taskId. We just switched our fixture with taskId not _id. Let's remove _id from everything
        const target = render(<DateTimeListView task={taskFixture()} />);

        // Assert
        expect(target.queryByTestId('DateTimeItem')).toBeInTheDocument();
        expect(target).toMatchSnapshot();
    });
});