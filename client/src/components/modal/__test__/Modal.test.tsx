import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

// mock components
jest.mock('@/components', () => ({
    Button: () => <div data-testid="Button">{"Button"}</div>,
}));
import Modal from '../Modal';

describe('Modal.test.js', () => {
    it('should render, with children, when children', () => {
        // Arrange
        const setIsShowingSpy = jest.fn();
        

        // Act
        const { queryByTestId } = render(<Modal
            setIsShowing={setIsShowingSpy}>
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
        const { queryByTestId } = render(<Modal setIsShowing={setIsShowingSpy} />);

        // Assert
        expect(queryByTestId("Button")).toBeInTheDocument();
        expect(queryByTestId("children")).toBeNull();
    });
});