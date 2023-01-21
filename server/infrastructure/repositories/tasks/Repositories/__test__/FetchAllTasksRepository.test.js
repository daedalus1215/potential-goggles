const FetchAllTasksRepository = require('../../FetchAllTasksRepository');
const Task = require('../../../../../models/Task');
const hydrate = require('../../../../../hydrators/hydrate');

describe('server/infrastructure/repositories/tasks/Repositories/__test__/FetchAllTasksRepository.test.js', () => {
    describe('FetchAllTasksRepository', () => {
        // Arrange
        beforeEach(() => {
            jest.mock('../../../../../models/Task');
            jest.mock('../../../../../hydrators/hydrate');
        });

        it('should return expected task and invoke Task.find with hydrate', () => {
            // Arrange
            const tasks = [{ _id: 1 }];
            Task.find = jest.fn().mockImplementation(() => tasks);

            // Act
            const actual = FetchAllTasksRepository();

            // Assert
            expect(actual).toEqual(tasks);
            expect(Task.find).toBeCalledWith({}, hydrate);
        });
    });
});