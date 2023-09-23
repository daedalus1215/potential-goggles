import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

// import target
import DateTimeListView from '../DateTimeListView';
import { TaskFixture } from '@/dataFixtures/TaskFixture';

// mock components
jest.mock('../DateTimeItem', () => {
    return () => <div data-testid="DateTimeItem"></div>;
});

jest.mock('@/hooks/useExpandedContext', () => ({
    default: () => ({ isExpanded: false })
}));

describe('DateTimeListView.test.tsx', () => {
    it('should render with DateTimeItem', () => {
        // Arrange
        // Act
        const target = render(<DateTimeListView task={{
            _id: 'randomId',
            title: 'randomTitle',
            description: 'randomDescription',
            projectId: 0,
            time: 0,
            favorite: true,
            dateTimes: [{id: 'randomId', time: '0', date: '2023-09-09'}],
            tags: ['']
        }} />);

        // Assert
        expect(target.queryByTestId('DateTimeItem')).toEqual('');
    });
    // it('should render without DateTimeItem', () => {
    //     // Arrange
    //     // Act
    //     const { queryByTestId } = render(<DateTimeListView task={TaskFixture} />);

    //     // Assert
    //     expect(queryByTestId('DateTimeItem')).toBeNull();
    // });
});