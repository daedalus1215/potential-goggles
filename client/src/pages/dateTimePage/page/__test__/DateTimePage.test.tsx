import React from "react";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// import target
import DateTimePage from '../DateTimePage';

// mock
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useLoaderData: () => ({ taskId: 'randoTaskId', title: 'randoTitle' }),
    useSubmit: () => jest.fn(),
    Form: ({ children }: any) => <div data-testid="Form">({children})</div>,
}));
jest.mock('@/components', () => ({
    TopBar: ({ children }: any) => <div data-testid="TopBar">({children})</div>,
    AddButton: () => <div data-testid="AddButton">AddButton</div>,
    BackButton: ({ path }: any) => <div data-testid="BackButton">{path}</div>
}));
jest.mock('../../dateTimeListView/DateTimeListView', () => ({
    default: ({task}: any) => <div data-testid="DateTimeListView">{task.taskId}</div>
}))

describe('DateTimePage.test.tsx', () => {
    it('should render...', async () => {
        // Arrange & Act
        const target = render(<DateTimePage />);

        // Assert
        expect(target.queryByTestId("BackButton")).toBeInTheDocument();
        expect(target.queryByTestId("BackButton")).toHaveTextContent('/task/randoTaskId');
        
        expect(target.queryByTestId("AddButton")).toBeInTheDocument();

        expect(target.queryByTestId("DateTimeListView")).toBeInTheDocument();
        expect(target.queryByTestId("DateTimeListView")).toHaveTextContent('randoTaskId');
        expect(target).toMatchSnapshot();
    });
});