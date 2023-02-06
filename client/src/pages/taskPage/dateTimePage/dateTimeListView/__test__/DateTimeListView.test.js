import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// import target
import DateTimeListView from '../DateTimeListView';

// mock components
jest.mock('../DateTimeItem', () => {
    return () => <div data-testid="DateTimeItem"></div>;
});

describe('DateTimeListView.test.js', () => {
    it('should render with DateTimeItem', () => {
        // Arrange
        const dateTimes = [{ id: 'dateTimeID' }];
        const setEditDateTimeSpy = jest.fn();

        // Act
        const { queryByTestId } = render(<DateTimeListView dateTimes={dateTimes} setEditDateTime={setEditDateTimeSpy} />);

        // Assert
        expect(queryByTestId('DateTimeItem')).toBeInTheDocument();
    });
    it('should render without DateTimeItem', () => {
        // Arrange
        const dateTimes = [];
        const setEditDateTimeSpy = jest.fn();

        // Act
        const { queryByTestId } = render(<DateTimeListView dateTimes={dateTimes} setEditDateTime={setEditDateTimeSpy} />);

        // Assert
        expect(queryByTestId('DateTimeItem')).toBeNull();
    });
});