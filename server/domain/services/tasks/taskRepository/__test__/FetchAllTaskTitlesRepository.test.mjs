import TaskModel from "../../../../../infrastructure/mongo/models/TaskModel.mjs";
import FetchAllTaskTitlesRepository from "../FetchAllTaskTitlesRepository.mjs";

describe('server/infrastructure/repositories/tasks/Repositories/__test__/FetchAllTaskTitlesRepository.test.js', () => {
    describe('FetchAllTaskTitlesRepository', () => {
        // Arrange
        beforeEach(() => {
            jest.mock('../../../../../infrastructure/mongo/models/TaskModel');
        });

        it('should return expected task and invoke Task.find with hydrate', async () => {
            // Arrange
            const tasks = [
                { _id: 1, title: 'first task title and name' },
                { _id: 2, title: 'second task title and name' },
                { _id: 3 } // Task with no title
            ];

            TaskModel.find = jest.fn().mockResolvedValue(tasks);

            // Act
            const actual = await FetchAllTaskTitlesRepository();

            // Assert
            expect(TaskModel.find).toHaveBeenCalledTimes(1);
            expect(actual).toEqual([
                { _id: 1, title: 'first task title and...' }, // truncated to 21 characters
                { _id: 2, title: 'second task title and...' }, // truncated to 21 characters
                { _id: 3, title: 'no title' } // 'no title' since title is undefined
            ]);
        });

        describe('#filter', () => {
            it('should filter on task title, if a title is passed in', async () => {
                // Arrange
                const tasks = [
                    { _id: 1, title: 'first task title and name' },
                    { _id: 2, title: 'second task title and name' },
                    { _id: 3 } // Task with no title
                ];

                TaskModel.find = jest.fn().mockResolvedValue(tasks);

                // Act
                const actual = await FetchAllTaskTitlesRepository('title');

                // Assert
                expect(TaskModel.find).toHaveBeenCalledTimes(1);
                expect(actual).toEqual([
                    { _id: 1, title: 'first task title and...' }, // truncated to 21 characters
                    { _id: 2, title: 'second task title and...' }, // truncated to 21 characters
                ]);
            })
        });
    });
});