// TSX Test boilerplate
import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

// target
import DateTimeListView from '../DateTimeListView';
import { TaskFixture } from '@/dataFixtures/TaskFixture';

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
        const target = render(<DateTimeListView task={TaskFixture} />);

        // Assert
        expect(target.queryByTestId('DateTimeItem')).toBeInTheDocument();
        expect(target).toMatchSnapshot();
    });
});