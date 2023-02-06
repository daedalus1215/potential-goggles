import React from "react";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Item from "../Item";

describe('Item.test.js', () => {
    it('should render', async () => {
        // Arrange 
        const id = 'id';
        const time = 1234;
        const date = 'date';
        const onClick = jest.fn();

        // Act
        const { findByTestId } = render(<Item id={id} time={time} date={date} onClick={onClick} />);

        // Assert
        expect(await findByTestId("DateTimeItem")).toBeInTheDocument();
    });
});