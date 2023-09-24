// TSX Test boilerplate
import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

// target
import Item from "../Item";

describe('Item.test.tsx', () => {
    it('should render', async () => {
        // Arrange 
        const id = 'id';
        const time = 1234;
        const date = 'date';
        const onClick = jest.fn();

        // Act
        const target = render(<Item id={id} time={time} date={date} onClick={onClick} />);

        // Assert
        expect(target.queryByTestId("DateTimeItem")).toBeInTheDocument();
    });
});