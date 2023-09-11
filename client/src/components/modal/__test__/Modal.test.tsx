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
        const target = render(<Modal
            setIsShowing={setIsShowingSpy}>
            <div data-testid="children">{"children"}</div>
        </Modal>);

        // Assert
        expect(target.queryByTestId("Button")).toBeInTheDocument();
        expect(target.queryByTestId("children")).toBeInTheDocument();
        expect(target).toMatchSnapshot();
    });

    it('should render, without children, when no children', () => {
        // Arrange
        const setIsShowingSpy = jest.fn();

        // Act
        const target = render(<Modal setIsShowing={setIsShowingSpy} />);

        // Assert
        expect(target.queryByTestId("Button")).toBeInTheDocument();
        expect(target.queryByTestId("children")).toBeNull();
        expect(target).toMatchSnapshot();
    });
});