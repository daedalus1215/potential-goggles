import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

// target
import DateTimeItem from "../DateTimeItem";

// dependencies
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    Link: ({ children }: any) => <div data-testid="Link">({children})</div>,
}));
jest.mock("moment-timezone", () => ({
    default: () => ({tz: () => ({format: () => {}})})
}));

describe('DateTimeItem.test.js', () => {
    it('should render', () => {
        // Arrange
        const taskId = "taskId";
        const dateTime = {
            id: 'dateTimeID',
            date: 'dateTimeDate',
            time: 'dateTimeTime',
        };

        // Act
        const target = render(<DateTimeItem dateTime={dateTime} taskId={taskId} />);

        // Assert
        expect(target.queryByTestId('Link')).toBeInTheDocument();
    });
});