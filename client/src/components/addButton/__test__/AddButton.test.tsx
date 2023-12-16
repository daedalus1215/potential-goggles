import { render, fireEvent } from "@testing-library/react";
import AddButton from "../AddButton";

describe('src/components/addButton/__test__/AddButton.test.tsx', () => {
    describe('AddButton', () => {
        it("should be present", () => {
            // Arrange
            const onClickSpy = jest.fn();

            // Act
            const target = render(<AddButton onClick={onClickSpy} />);

            // Assert
            expect(target.getByTestId('AddButton')).toBeTruthy
            expect(target).toMatchSnapshot();
        });
    });
});