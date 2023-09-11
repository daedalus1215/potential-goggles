import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

// target
import EditDateTimeForm from '../EditDateTimeForm';

// mocks
jest.mock('@/hooks/useExpandedContext', () => ({
    default: () => ({ isExpanded: false })
}));
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useLoaderData: () => ({ dateTime: { time: '123:23' }, taskId: 'randoTaskId' }),
    useSubmit: () => jest.fn(),
    Form: ({ children }: any) => <div data-testid="Form">({children})</div>,
}));
jest.mock('@/components', () => ({
    TopBar: ({ children }: any) => <div data-testid="TopBar">({children})</div>,
    SaveButton: () => <div data-testid="SaveButton">SaveButton</div>,
    BackButton: ({ path }: any) => <div data-testid="BackButton">{path}</div>
}));

describe('src/pages/tasks/TaskForm/dateTimeDetail/EditDateTimeForm/__test__/EditDateTimeForm.test.tsx', () => {
    describe('EditDateTimeForm', () => {
        it('should render', () => {
            // Arrange & Act
            const target = render(<EditDateTimeForm />);

            // Assert
            expect(target.queryByTestId("BackButton")).toBeInTheDocument();
            expect(target.queryByTestId("BackButton")).toHaveTextContent(`/task/randoTaskId/date-time`);
            expect(target).toMatchSnapshot();
        });
    });
});