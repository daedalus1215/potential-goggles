import { renderHook } from '@testing-library/react-hooks';
import { getCurrentDateTimeEstFormat } from 'utils';
import { useTaskEditContext, useLoadinSpinnerContext } from 'hooks';
import useTaskAssembler from '../useTaskAssembler';

jest.mock('hooks/useTaskEditContext');

describe('src/pages/tasks/TaskListView/ControlButtons/DownloadButton/__test__/useTaskAssembler.test.js', () => {
    describe('useTaskAssembler', () => {
        // Arrange
        // task context
        const taskContextMock = {
            tasks: [
                {
                    _id: 1,
                    date: "2020-05-16T00:00:00.000Z",
                    description: "description of task",
                    time: 0,
                    contractId: 0,
                    tags: [
                        {
                            "_id": "12",
                            "name": "tag1",
                            "description": "tag1 description",
                            "contractId": 0,
                            "time": 0,
                            "__v": 0
                        }
                    ],
                },
            ],
            projects: [],
        };

        beforeEach(() => {
            useTaskEditContext.mockReturnValue(taskContextMock);
        });

        it('should return an assembled Time Task with all the appropriate work units', () => {
            // Arrange
            const expected = {
                date: getCurrentDateTimeEstFormat(new Date()),
                WorkUnit: [
                    {
                        _id: 1,
                        date: '2020-05-16T00:00:00.000Z',
                        description: 'description of task',
                        time: '0.00',
                        contractId: 0,
                        tags: [{
                            "__v": 0,
                            "_id": "12",
                            "contractId": 0,
                            "description": "tag1 description",
                            "name": "tag1",
                            "time": 0,
                        }]
                    }
                ]
            };

            // Act
            const { result } = renderHook(() => useTaskAssembler());
            const actual = result.current();

            
            // Assert
            expect(actual).toEqual(expected);
        });
    });
});