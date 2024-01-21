import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import FetchAllTasksRepository from "../FetchAllTasksRepository.mjs";

describe('server/infrastructure/repositories/tasks/Repositories/__test__/FetchAllTasksRepository.test.js', () => {
    describe('FetchAllTasksRepository', () => {
        // Arrange
        beforeEach(() => {
            jest.mock('../../../../../infrastructure/models/TaskModel');
        });

        it('should return expected task and invoke Task.find with hydrate', async () => {
            // Arrange
            const tasks = {item: [{ _id: 1 }, { _id: 2 }], sort: jest.fn().mockImplementation(() => tasks)};
            TaskModel.find = jest.fn().mockImplementation(() => tasks);

            // Act
            const actual = await FetchAllTasksRepository();

            // Assert
            expect(TaskModel.find).toBeCalledWith({});
            expect(actual).toEqual(tasks);
        });
    });
});