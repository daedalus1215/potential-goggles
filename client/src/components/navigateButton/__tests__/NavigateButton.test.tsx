import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import NavigateButton from '../NavigateButton';

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => jest.fn(),
}));

describe('src/components/navigateButton/__test__/NavigateButton.test.tsx', () => {
    describe('NavigateButton', () => {
        it('should render', () => {
            // Arrange & Act
            const target = render(<NavigateButton icon="bi" url="bar" style="aStyle" />);

            // Assert
            expect(target.queryByTestId('icon-button')).toBeInTheDocument();
            expect(target.queryByTestId('icon-button')).toMatchSnapshot();
        });
    });
});