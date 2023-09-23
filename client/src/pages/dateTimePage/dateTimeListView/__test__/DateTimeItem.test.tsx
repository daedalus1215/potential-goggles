import React from "react";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// target
import DateTimeItem from "../DateTimeItem";

// dependencies
import { useRippleEffectById } from 'hooks';

// mock dependencies
jest.mock('hooks/useRippleEffect/useRippleEffectById');


describe('DateTimeItem.test.js', () => {
    it('should render', () => {
        // Arrange
        const setEditDateTimeSpy = jest.fn();
        const dateTime = {
            id: 'dateTimeID',
            date: 'dateTimeDate',
            time: 'dateTimeTime',
        };

        // Act
        const { queryByTestId } = render(<DateTimeItem dateTime={dateTime} setEditDateTime={setEditDateTimeSpy} />);

        // Assert
        expect(queryByTestId('DateTimeItem')).toBeInTheDocument();
    });

    it('should call setEditDateTimeSpy on click', () => {
        // Arrange
        const setEditDateTimeSpy = jest.fn();
        const dateTime = {
            id: 'dateTimeID',
            date: 'dateTimeDate',
            time: 'dateTimeTime',
        };
        const onClick = setEditDateTimeSpy;
        useRippleEffectById.mockImplementation(onClick);

        // Act
        const { getByTestId } = render(<DateTimeItem dateTime={dateTime} setEditDateTime={setEditDateTimeSpy} />);
        fireEvent.click(getByTestId("DateTimeItem"));

        // Assert
        expect(useRippleEffectById).toBeCalledWith(dateTime.id, expect.anything());
        expect(getByTestId('DateTimeItem')).toBeInTheDocument();
        expect(setEditDateTimeSpy).toBeCalledWith(dateTime.id, expect.anything());
    });
});