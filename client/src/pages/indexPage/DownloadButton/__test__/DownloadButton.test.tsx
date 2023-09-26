import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

import DownloadButton from '../DownloadButton';

describe('src/pages/indexPage/DownloadButton/__test__/DownloadButton.test.tsx', () => {
    describe('DownloadButton', () => {
        it('should render', () => {
            // Arrange & Act
            const target = render(<DownloadButton />);

            // Assert
            expect(target.queryByTestId('icon-button')).toBeInTheDocument();
            expect(target.queryByTestId('icon-button')).toMatchSnapshot();
        });
    });
});