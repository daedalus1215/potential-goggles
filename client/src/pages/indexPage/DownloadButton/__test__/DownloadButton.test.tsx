import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { createMock } from "@/testUtils/createMock";

import DownloadButton from '../DownloadButton';
import writeJsonFile from '../writeJsonFile';

jest.mock('../writeJsonFile', () => ({
    writeJsonFile: jest.fn(),
}));

describe('src/pages/indexPage/DownloadButton/__test__/DownloadButton.test.tsx', () => {
    describe('DownloadButton', () => {
        it('should render', () => {
            // Arrange & Act
            const target = render(<DownloadButton />);
            createMock(writeJsonFile, {});
            
            // Assert
            expect(target.queryByTestId('icon-button')).toBeInTheDocument();
            expect(target.queryByTestId('icon-button')).toMatchSnapshot();
        });
    });
});