import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from '../Modal';

// mock components
jest.mock('components/Button', () => {
    return () => <div data-testid="Button">{"Button"}</div>;
})

describe('Modal.test.js', () => {
    it('should render, with children, when children', () => {
        // Arrange
        const setIsShowingSpy = jest.fn();

        // Act
        const { queryByTestId } = render(<Modal
            setIsShowingSpy={setIsShowingSpy}>
            <div data-testid="children">{"children"}</div>
        </Modal>);

        // Assert
        expect(queryByTestId("Button")).toBeInTheDocument();
        expect(queryByTestId("children")).toBeInTheDocument();
    });

    it('should render, without children, when no children', () => {
        // Arrange
        const setIsShowingSpy = jest.fn();

        // Act
        const { queryByTestId } = render(<Modal setIsShowingSpy={setIsShowingSpy} />);

        // Assert
        expect(queryByTestId("Button")).toBeInTheDocument();
        expect(queryByTestId("children")).toBeNull();
    });
});