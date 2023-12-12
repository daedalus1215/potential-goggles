import { render } from "@testing-library/react";
import { Date } from "../Date";

describe('client/src/components/date/__test__/Date.test.tsx', () => {
    it('should render', () => {
        // Arrange & Act
        const target = render(<Date date='2023-12-12' setDate={jest.fn()} />)

        // Assert
        expect(target.findByTestId('date'));
        expect(target.findByTestId("date")).toMatchSnapshot();
    });

    // @TODO: Do onclick test
});