const FetchTaskByIdRepository = require('../FetchTaskByIdRepository');
const Task = require('../../../../../models/Task');
const EntityToDto = require('../EntityToDto');

jest.mock('../../../../../models/Task');
jest.mock('../EntityToDto');

describe('server/infrastructure/repositories/tasks/Repositories/__test__/FetchTaskByIdRepository.test.js', () => {
    describe('FetchTaskByIdRepository', () => {
        it('should invoke Task.findById and then convert the returned entity into a dto', async () => {
            // Arrange
            const id = 'id';
            const tasks = { _id: 1 };
            Task.findById = jest.fn().mockImplementation(() => tasks);
            EntityToDto.mockImplementation(() => tasks);

            // Act
            const actual = await FetchTaskByIdRepository(id);

            // Assert
            expect(actual).toEqual(tasks);
            expect(Task.findById).toBeCalledWith(id);
        });
    });
});